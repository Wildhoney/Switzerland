import { toCamelcase } from '../../core/utils.js';

/**
 * @function createPatch
 * ---
 * Monkey-patches the `URLSearchParams` instance by overriding the `get` function which yields
 * the value otherwise the default value in its given type.
 */
export function createPatch(getF, types, defaults) {
    return (name) => {
        const key = toCamelcase(name).fromSnake();
        const [f] = [].concat(types[key] || ((a) => a));
        return getF(name) ? f(getF(name)) : defaults[key] || null;
    };
}

/**
 * @function changeState
 * ---
 * Modifies the state of the browser's history with either pushing of replacing the state, but also
 * dispatching the `popstate` function which allows for listening to changes.
 */
export function changeState(f) {
    return (...params) => {
        window.history[f](...params);
        const event = new window.PopStateEvent('popstate');
        window.dispatchEvent(event);
    };
}

/**
 * @function getParams
 * ---
 * Instantiates the `URLSearchParams` object and then monkey-patches the `get` function using the
 * `createPatch` function from above.
 */
export function getParams(types, defaults, location = window.location) {
    const params = new URLSearchParams(location.search);
    const get = params.get.bind(params);
    params.get = createPatch(get, types, defaults);
    return params;
}
