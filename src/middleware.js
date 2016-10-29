import { options as stateOptions } from './middleware/state';
import { options as includeOptions } from './middleware/include';
import { options as onceOptions } from './middleware/once';

/**
 * @constant options
 * @type {Object}
 */
export const options = {
    state: stateOptions,
    include: includeOptions,
    once: onceOptions
};

export { default as html } from './middleware/html';
export { default as once } from './middleware/once';
export { default as attrs } from './middleware/attributes';
export { default as state } from './middleware/state';
export { default as include } from './middleware/include';
export { default as redux } from './middleware/redux';
export { default as refs } from './middleware/refs';
export { default as methods } from './middleware/methods';
export { default as events } from './middleware/events';
export { default as validate } from './middleware/validate';
export { default as cleanup } from './middleware/cleanup';
export { default as vars } from './middleware/vars';
export { default as await } from './middleware/await';
export { time, timeEnd } from './debug/timer';
