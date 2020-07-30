import { toCamelcase } from '../../../utils.js';

export function createPatch(getF, types, defaults) {
    return (name) => {
        const key = toCamelcase(name).fromSnake();
        const [f] = [].concat(types[key] || ((a) => a));
        return getF(name) ? f(getF(name)) : defaults[key] || null;
    };
}

export function changeState(f) {
    return (...params) => {
        window.history[f](...params);
        const event = new window.PopStateEvent('popstate');
        window.dispatchEvent(event);
    };
}

export function getParams(types, defaults, location = window.location) {
    const params = new URLSearchParams(location.search);
    const get = params.get.bind(params);
    params.get = createPatch(get, types, defaults);
    return params;
}
