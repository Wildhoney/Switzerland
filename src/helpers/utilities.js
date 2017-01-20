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
export default once(() => env === 'development');

/**
 * @method pipe
 * @param {Array} fns
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
 * @param {Array} fns
 * @return {Object}
 */
export const compose = (...fns) => pipe(fns.reverse());

/**
 * @method kebabToCamel
 * @param {String} str
 * @return {String}
 */
export const kebabToCamel = str => str.replace(/(-\w)/g, match => match[1].toUpperCase());
