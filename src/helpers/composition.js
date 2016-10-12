import { pipe as ramdaPipe } from 'ramda';

/**
 * @method pipe
 * @param {Array} fns
 * @return {Object}
 */
export const pipe = (...fns) => {
    return ramdaPipe(...fns);
};

/**
 * @constant compose
 * @param {Array} fns
 * @return {Object}
 */
export const compose = (...fns) => {
    return pipe(fns.reverse());
};
