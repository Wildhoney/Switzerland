import { consoleMessage, getWindow, replaceTemplate } from '../../utils.js';
import * as adapters from '../../adapters/index.js';
import * as renderer from '../renderer/index.js';

export async function getInitialProps(node, props) {
    const server = props.server ?? false;

    return {
        node,
        server,
        options: {},
        lifecycle: 'update',
        render: (props) => node?.render?.(props),
        dispatch: dispatchEvent(node),
        window: server ? await getWindow() : window,
        ...props,
    };
}

/**
 * @function dispatchEvent
 * ---
 * Dispatches an event, merging in the current package's version for handling legacy events
 * if/when the payloads differ from version-to-version.
 */
export const dispatchEvent = (node) => (name, payload, options = {}) => {
    const model = typeof payload === 'object' ? payload : { value: payload };

    return node.dispatchEvent(
        new window.CustomEvent(name, {
            bubbles: true,
            composed: true,
            ...options,
            detail: { ...model, version: 5 },
        })
    );
};

/**
 * @function bindAdapters
 * ---
 * Takes an object of adapters and binds them by invoking the adapter function with the current render
 * props, which allows the adapter to access the internal state of the custom element and re-render.
 */
export async function bindAdapters(renderProps, options, boundableAdapters = adapters) {
    function applyAdapters(adapters) {
        return Object.entries(adapters).reduce(async (accum, [name, adapter]) => {
            const adapters = await accum;
            const isNested = typeof adapter === 'object';
            return {
                ...adapters,
                [name]: isNested ? await applyAdapters(adapter) : adapter({ ...renderProps, options }),
            };
        }, {});
    }

    return await applyAdapters(boundableAdapters);
}

/**
 * @function makeCyclicProps
 * ---
 * Utility function for making the props infinitely nestable, this allows the props to be destructured
 * infinitely which faciliates passing them down to other components. Similar to Haskell's at-syntax.
 */
export function makeCyclicProps(props) {
    props.props = props;
    return props;
}

/**
 * @function renderTree
 * ---
 * Takes all of the arguments required for rendering the current tree by invoking the controller followed by
 * the view, and then determining if there are any forms in the rendered output, and if so invoking a second
 * pass over both the controller and view.
 */
export async function renderTree({ renderProps, boundAdapters, runController, runView, detectForms = true }) {
    // Run the controller and pass those props to the view which yields a tree to render.
    const viewProps = await runController(makeCyclicProps({ ...renderProps, adapter: boundAdapters }));
    const tree = await runView(makeCyclicProps({ ...renderProps, ...viewProps }));

    // Render the tree that is yielded from the view.
    await renderer.renderTree({ ...renderProps, tree });

    if (!renderProps.server && detectForms) {
        // Determine if there are any form nodes in the renderer HTML.
        const form = renderer.renderForms(renderProps.node);

        if (Object.keys(form).length > 0)
            return renderTree({
                renderProps: { ...renderProps, form, lifecycle: 'update' },
                boundAdapters,
                runController,
                runView,
                detectForms: false,
            });
    }

    return tree;
}

/**
 * @function runComponent
 * ---
 * Takes and gathers from other sources all of the required data for rendering the component. Also writes to the stream
 * if the developer invoked the `renderToStream` function.
 */
export async function runComponent(node, props, [runController, runView], options = {}) {
    const renderProps = { ...props, ...(await getInitialProps(node, props)), form: renderer.getForms(node), options };
    const boundAdapters = await bindAdapters(renderProps, options);
    const isStreaming = typeof options.stream !== 'undefined';

    try {
        // Run the controller to gather its props for view rendering, and write to the stream if available.
        const tree = await renderTree({ boundAdapters, renderProps, runController, runView });
        isStreaming && options.stream.write(replaceTemplate(node.innerHTML));
        return tree;
    } catch (error) {
        // Invoke the controller and view again but with passing the error that was thrown, writing to the stream
        // again if necessary.
        process?.env?.NODE_ENV !== 'production' && consoleMessage(error);
        await renderTree({ boundAdapters, renderProps: { ...renderProps, error }, runController, runView });
        isStreaming && options.stream.write(replaceTemplate(node.innerHTML));

        // Re-throw an error so the caller in `Swiss.render` can clear the queue.
        throw new Error('switzerland/error');
    }
}
