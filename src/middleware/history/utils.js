import { toCamelcase, getEventName } from '../../core/utils.js';

export const eventName = getEventName('update-state');

/**
 * @function createPatch ∷ ∀ a b. (String → String) → Object String a → Object String a → (String → a)
 */
export const createPatch = (getF, types, defaults) => {
    return name => {
        const key = toCamelcase(name).fromSnake();
        const [f] = [].concat(types[key] || (a => a));
        return getF(name) ? f(getF(name)) : defaults[key] || null;
    };
};

/**
 * @function changeState ∷ ∀ a b. Object String a → String → [b]
 */
export const changeState = ({ utils }, fName) => (...params) => {
    window.history[fName](...params);
    utils.dispatch(eventName, { params });
};

/**
 * @function getParams ∷ ∀ a b. Object String a → Object String b → String → URLSearchParams
 */
export const getParams = (types, defaults, location = window.location) => {
    const params = new URLSearchParams(location.search);
    const get = params.get.bind(params);
    params.get = createPatch(get, types, defaults);
    return params;
};
