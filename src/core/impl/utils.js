import { consoleMessage, getWindow } from '../../utils.js';
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

export function makeCyclicProps(props) {
    props.props = props;
    return props;
}

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

export async function runComponent(node, props, [runController, runView], options = {}) {
    const renderProps = { ...props, ...(await getInitialProps(node, props)), form: renderer.getForms(node), options };
    const boundAdapters = await bindAdapters(renderProps, options);

    try {
        // Run the controller to gather its props for view rendering, and write to the stream if available.
        const tree = await renderTree({ boundAdapters, renderProps, runController, runView });
        typeof options.stream !== 'undefined' &&
            options.stream.write(node.innerHTML.replace(/swiss-template/g, 'template'));
        return tree;
    } catch (error) {
        // Invoke the controller and view again but with passing the error that was thrown, writing to the stream
        // again if necessary.
        process?.env?.NODE_ENV !== 'production' && consoleMessage(error);
        await renderTree({ boundAdapters, renderProps: { ...renderProps, error }, runController, runView });
        typeof options.stream !== 'undefined' &&
            options.stream.write(node.innerHTML.replace(/swiss-template/g, 'template'));

        // Re-throw an error so the caller in `Swiss.render` can clear the queue.
        throw new Error('switzerland/error');
    }
}
