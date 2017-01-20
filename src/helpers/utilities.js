import pipeP from 'ramda/src/pipeP';
import once from 'ramda/src/once';

/**
 * @constant env
 * @type {String}
 */
const env = (() => {

    try {
        return process.env.NODE_ENV;
    } catch (err) {
        return 'development';
    }

})();

/**
 * @method isDevelopment
 * @return {Boolean}
 */
export const isDevelopment = once(() => env === 'development');

/**
 * @method pipe
 * @param {Function} fns
 * @return {Function}
 */
export const pipe = (...fns) => {

    const promisedFns = fns.map(fn => props => {
        return Promise.resolve(fn(props));
    });

    return pipeP(...promisedFns);

};

/**
 * @constant compose
 * @param {Function} fns
 * @return {Object}
 */
export const compose = (...fns) => pipe(fns.reverse());
