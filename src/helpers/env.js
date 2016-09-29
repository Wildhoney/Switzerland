import { once } from 'ramda';

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
