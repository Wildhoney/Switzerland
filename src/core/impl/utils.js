import { consoleMessage, getWindow } from '../../utils.js';
import * as adapters from '../../adapters/index.js';
import * as renderer from '../renderer/index.js';

export async function getInitialProps(node, props) {
    const server = props.server ?? false;

    return {
        node,
        server,
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

function makeCyclicProps(props) {
    props.props = props;
    return props;
}

async function renderTree({ node, boundAdapters, renderProps, runController, runView }) {
    const viewProps = await runController(makeCyclicProps({ ...renderProps, adapter: boundAdapters }));
    const tree = await runView(makeCyclicProps({ ...renderProps, ...viewProps }));
    await renderer.renderTree({ ...renderProps, tree });

    {
        const form = renderer.renderForms(node);

        if (Object.keys(form).length > 0) {
            // Re-render the controller and view if a form is detected in the output.
            const viewProps = await runController(makeCyclicProps({ ...renderProps, adapter: boundAdapters, form }));
            const tree = await runView(makeCyclicProps({ ...renderProps, ...viewProps, form, lifecycle: 'update' }));
            await renderer.renderTree({ ...renderProps, tree, lifecycle: 'update' });
        }
    }
}

export async function runComponent(node, props, [runController, runView]) {
    const renderProps = { ...props, ...(await getInitialProps(node, props)), form: renderer.getForms(node) };
    const boundAdapters = await bindAdapters(renderProps);

    try {
        // Run the controller to gather its props for view rendering.
        return renderTree({ node, boundAdapters, renderProps, runController, runView });
    } catch (error) {
        // Invoke the controller and view again but with passing the error that was thrown.
        process?.env?.NODE_ENV !== 'production' && consoleMessage(error);
        await renderTree({ node, boundAdapters, renderProps: { ...renderProps, error }, runController, runView });

        // Re-throw an error so the caller in `Swiss.render` can clear the queue.
        throw new Error('switzerland/error');
    }
}
