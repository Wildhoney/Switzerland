import * as utils from './utils.js';

/**
 * @function state
 * ---
 * Provides a local state that is very similar to React's `useState` hook.
 */
export default () => {
    return function state(props) {
        return { ...props, state: utils.useState(props) };
    };
};
