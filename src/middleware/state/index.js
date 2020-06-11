const nodes = new WeakMap();

export const newState = Symbol('switzerland/new-state');

/**
 * @function state
 */
export default (initialState = {}) => {
    return async function state(props) {
        props.lifecycle === 'unmount' && nodes.delete(props.node);

        const clonedProps = { ...props };

        if (props[newState]) {
            // Allow other middleware items to inject state.
            const state = nodes.get(props.node) ?? initialState;
            nodes.set(props.node, { ...state, ...props[newState] });
            delete clonedProps[newState];
        }

        return {
            ...clonedProps,
            state: nodes.get(props.node) ?? initialState,
            setState: (state) => (nodes.set(props.node, state), props.render()),
        };
    };
};
