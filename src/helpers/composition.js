import PromisePipe from 'promised-pipe';

/**
 * @method pipe
 * @param {Array} fns
 * @return {Function}
 */
export const pipe = PromisePipe;

/**
 * @constant compose
 * @param {Array} fns
 * @return {Object}
 */
export const compose = (...fns) => pipe(fns.reverse());
