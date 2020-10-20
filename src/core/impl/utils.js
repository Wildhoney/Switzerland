import { consoleMessage, getWindow, replaceTemplate } from '../../utils.js';
import * as adapters from '../../adapters/index.js';
import * as renderer from '../renderer/index.js';

const adapterStates = new WeakMap();

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
                [name]: await (isNested
                    ? applyAdapters(adapter)
                    : adapter({ ...renderProps, options, boundableAdapters })),
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
 * Takes all of the arguments required for rendering the current tree by invoking the view, and then
 * determining if there are any forms in the rendered output, and if so invoking a second pass over
 * the component's view.
 */
export async function renderTree({ renderProps, boundAdapters, view }) {
    // Setup the `use` function to take custom functions and bind all of the pre-established
    // functions to the `use` as well.
    const use = (fn) => {
        const currentState = adapterStates.get(renderProps.node) ?? {};
        const newState = fn({ ...renderProps, state: currentState });
        newState != null && adapterStates.set(renderProps.node, { ...currentState, ...newState });
    };

    Object.entries(boundAdapters).forEach(([key, value]) => (use[key] = value));

    // Run the view and pass those props to the view which yields a tree to render.
    const tree = await view(makeCyclicProps({ ...renderProps, use }));

    // Render the tree that is yielded from the view.
    await renderer.renderTree({ ...renderProps, tree });

    return tree;
}

/**
 * @function runComponent
 * ---
 * Takes and gathers from other sources all of the required data for rendering the component. Also writes to the stream
 * if the developer invoked the `renderToStream` function.
 */
export async function runComponent(node, props, view, options = {}) {
    const renderProps = { ...props, ...(await getInitialProps(node, props)), options };
    const boundAdapters = await bindAdapters(renderProps, options);
    const isStreaming = typeof options.stream !== 'undefined';

    try {
        // Run the view to gather its structure for the DOM tree and write to the stream if available.
        const tree = await renderTree({ boundAdapters, renderProps, view });
        isStreaming && options.stream.write(replaceTemplate(node.innerHTML));
        return tree;
    } catch (error) {
        // Invoke the view again but with passing the error that was thrown, writing to the stream
        // again if necessary.
        process?.env?.NODE_ENV !== 'production' && consoleMessage(error);
        await renderTree({ boundAdapters, renderProps: { ...renderProps, error }, view });
        isStreaming && options.stream.write(replaceTemplate(node.innerHTML));

        // Re-throw an error so the caller in `Swiss.render` can clear the queue.
        throw new Error('switzerland/error');
    }
}
