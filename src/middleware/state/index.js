const nodes = new WeakMap();

/**
 * @function state
 */
export default (initialState) => {
    return async function state(props) {
        props.lifecycle === 'unmount' && nodes.delete(props.node);

        return {
            ...props,
            state: nodes.get(props.node) ?? initialState,
            setState: (state) => (nodes.set(props.node, state), props.render()),
        };
    };
};
