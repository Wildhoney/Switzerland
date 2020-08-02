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

export async function bindAdapters(renderProps, options, boundableAdapters = adapters) {
    function applyAdapters(adapters) {
        return Object.entries(adapters).reduce(async (accum, [name, adapter]) => {
            const adapters = await accum;
            const isNested = typeof adapter === 'object';
            return { ...adapters, [name]: isNested ? await applyAdapters(adapter) : adapter(renderProps, options) };
        }, {});
    }

    return await applyAdapters(boundableAdapters);
}

export function makeCyclicProps(props) {
    props.props = props;
    return props;
}

export async function renderTree({ renderProps, boundAdapters, runController, runView, options }) {
    // Run the controller and pass those props to the view which yields a tree to render.
    const viewProps = await runController(makeCyclicProps({ ...renderProps, adapter: boundAdapters }));
    const tree = await runView(makeCyclicProps({ ...renderProps, ...viewProps }));

    // Render the tree that is yielded from the view.
    await renderer.renderTree({ ...renderProps, tree, options });

    {
        // Determine if there are any form nodes in the renderer HTML.
        const form = renderer.renderForms(renderProps.node);

        if (Object.keys(form).length > 0) {
            // Re-render the controller and view if a form is detected in the output.
            const viewProps = await runController(makeCyclicProps({ ...renderProps, adapter: boundAdapters, form }));
            const tree = await runView(makeCyclicProps({ ...renderProps, ...viewProps, form, lifecycle: 'update' }));
            await renderer.renderTree({ ...renderProps, tree, lifecycle: 'update', options });

            return tree;
        }
    }

    return tree;
}

export async function runComponent(node, props, [runController, runView], options = {}) {
    const renderProps = { ...props, ...(await getInitialProps(node, props)), form: renderer.getForms(node) };
    const boundAdapters = await bindAdapters(renderProps, options);

    try {
        // Run the controller to gather its props for view rendering.
        return await renderTree({ boundAdapters, renderProps, runController, runView, options });
    } catch (error) {
        // Invoke the controller and view again but with passing the error that was thrown.
        process?.env?.NODE_ENV !== 'production' && consoleMessage(error);
        await renderTree({ boundAdapters, renderProps: { ...renderProps, error }, runController, runView });

        // Re-throw an error so the caller in `Swiss.render` can clear the queue.
        throw new Error('switzerland/error');
    }
}
