import options from '../helpers/options';

/**
 * @constant states
 * @type {WeakMap}
 */
const states = new WeakMap();

/**
 * @param {Object} initialState
 * @param {Number} [flags = options.DEFAULT]
 * @return {Function}
 */
export default (initialState, flags = options.DEFAULT) => {

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

            // Determine whether or not to use the React default of `setState` being deferred
            // until the next tick.
            const fn = flags & options.DEFER ? setTimeout : stateFn => stateFn();

            fn(() => {
                states.set(props.node, { ...state, ...updatedState });
                props.node.render();
            });

        };

        return { ...props, state, setState };

    };

};
