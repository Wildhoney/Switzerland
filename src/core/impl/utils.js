import { consoleMessage, getWindow } from '../../utils.js';
// import { rescueHandler } from '../../middleware/rescue/index.js';
import renderer from '../renderer/index.js';
import * as adapters from './adapters/index.js';

export async function getInitialProps(node, props) {
    const server = props.server ?? false;

    return {
        node,
        server,
        lifecycle: 'update',
        render: (props) => node.render(props),
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
            detail: { ...model, version: 4 },
        })
    );
};

async function bindAdapters(renderProps) {
    return Object.entries(adapters).reduce(async (accum, [name, runAdapter]) => {
        const adapters = await accum;
        return { ...adapters, [name]: await runAdapter(renderProps) };
    }, {});
}

export async function runComponent(node, props, [runController, runView]) {
    const renderProps = { ...props, ...(await getInitialProps(node, props)) };
    const controllerProps = {
        ...renderProps,
        node,
        lifecycle: props.lifecycle,
        adapter: await bindAdapters(renderProps),
    };

    try {
        // Run the controller to gather its props for view rendering.
        const viewProps = await runController(controllerProps);
        const tree = await runView(viewProps);
        await renderer({ ...renderProps, tree });
    } catch (error) {
        // Invoke the controller and view again but with passing the error that was thrown.
        process?.env?.NODE_ENV !== 'production' && consoleMessage(error);
        const viewProps = await runController({ ...controllerProps, error });
        const tree = await runView({ ...viewProps, error });
        await renderer({ ...renderProps, tree });

        // Re-throw an error so the caller in `Swiss.render` can clear the queue.
        throw new Error('switzerland/error');
    }
}
