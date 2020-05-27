export function getInitialProps(node, props) {
    return {
        node,
        boundary: node.shadowRoot ?? node,
        server: false,
        render: (props) => node.render(props),
        dispatch: dispatchEvent(node),
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

export function cycleMiddleware(node, props, middleware) {
    async function cycle(props, middleware) {
        return middleware(await props);
    }

    const initialProps = getInitialProps(node);
    return middleware.reduce(cycle, { ...initialProps, ...props });
}
