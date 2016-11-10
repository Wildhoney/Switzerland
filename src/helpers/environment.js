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
