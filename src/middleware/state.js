/**
 * @constant states
 * @type {WeakMap}
 */
const states = new WeakMap();

/**
 * @param {Object} initialState
 * @return {Function}
 */
export default initialState => {

    return props => {

        const hasState = states.has(props.node);
        const state = hasState ? states.get(props.node) : initialState;
        !hasState && states.set(props.node, state);

        /**
         * @method setState
         * @param {Object} updatedState
         * @return {void}
         */
        const setState = updatedState => {
            states.set(props.node, { ...state, ...updatedState });
            props.render();
        };

        return { ...props, state, setState };

    };

};
