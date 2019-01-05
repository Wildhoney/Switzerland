// /**
//  * @function load ∷ ∀ a. Props p ⇒ String → a|[a] → p → p
//  */
// const load = name => async (...args) => {
//     const module = await import(`./${name}/index.js`);
//     return module.default(...args);
// };

// export const adapt = load('adapt');
// export const attrs = load('attrs');
// export const blend = load('blend');
// export const defer = load('defer');
// export const delay = load('delay');
// export const history = load('history');
// export const intersect = load('intersect');
// export const interval = load('interval');
// export const loader = load('loader');
// export const methods = load('methods');
// export const once = load('once');
// export const redux = load('redux');
// export const rescue = load('rescue');
// export const template = load('template');
// export const vdom = load('vdom');
// export const wait = load('wait');

export { default as adapt } from './adapt/index.js';
export { default as attrs } from './attrs/index.js';
export { default as blend } from './blend/index.js';
export { default as defer } from './defer/index.js';
export { default as delay } from './delay/index.js';
export { default as history } from './history/index.js';
export { default as intersect } from './intersect/index.js';
export { default as interval } from './interval/index.js';
export { default as loader } from './loader/index.js';
export { default as methods } from './methods/index.js';
export { default as once } from './once/index.js';
export { default as redux } from './redux/index.js';
export { default as rescue } from './rescue/index.js';
export { default as template } from './template/index.js';
export { default as vdom } from './vdom/index.js';
export { default as wait } from './wait/index.js';
