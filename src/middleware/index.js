/**
 * @function load ∷ ∀ a. Props p ⇒ String → a|[a] → p → p
 */
const load = name => async (...args) => {
    const module = await import(`./${name}/index.js`);
    return module.default(...args);
};

export const adapt = load('adapt');
export const attrs = load('attrs');
export const blend = load('blend');
export const boundary = load('boundary');
export const debug = load('debug');
export const defer = load('defer');
export const delay = load('delay');
export const history = load('history');
export const intersect = load('intersect');
export const interval = load('interval');
export const loader = load('loader');
export const methods = load('methods');
export const once = load('once');
export const redux = load('redux');
export const rename = load('rename');
export const rescue = load('rescue');
export const state = load('state');
export const template = load('template');
export const html = load('html');
export const wait = load('wait');
