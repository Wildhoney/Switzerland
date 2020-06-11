import { consoleMessage, getWindow } from '../../utils.js';
import { rescueHandler } from '../../middleware/rescue/index.js';

export async function getInitialProps(node, props) {
    const server = props.server ?? false;

    return {
        node,
        boundary: node.shadowRoot ?? node,
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

export async function cycleMiddleware(node, props, middleware) {
    const records = new Map();

    async function cycle(props, middleware) {
        const updatedProps = await props;
        updatedProps.props = updatedProps;

        try {
            const newProps = await (await middleware)(updatedProps);

            // Keep a reference to the rescue handler if the new props yield one.
            if (rescueHandler in newProps) records.set('handler', newProps[rescueHandler]);

            return newProps;
        } catch (error) {
            const handler = records.get('handler');

            // Invoke the error handler if it's present, otherwise show a console error.
            await (handler ? handler({ ...updatedProps, error }) : consoleMessage(error));

            // Re-throw an error so the caller in `Swiss.render` can clear the queue.
            throw new Error('switzerland/error');
        }
    }

    const initialProps = await getInitialProps(node, props);
    return middleware.reduce(cycle, { ...initialProps, ...props });
}
