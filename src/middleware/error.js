/**
 * @constant handlers
 * @type {WeakMap}
 */
const handlers = new WeakMap();

/**
 * @constant htmlErrorKey
 * @type {Symbol}
 */
const htmlErrorKey = Symbol('switzerland/error');

/**
 * @method htmlErrorFor
 * @return {Object}
 */
export const htmlErrorFor = node => node[htmlErrorKey];

/**
 * @param {Function} errorHtml
 * @return {Function}
 */
export default errorHtml => {

    return props => {

        !handlers.has[props.node] && (() => {

            // Assign the HTML error function to the node if it hasn't yet been defined.
            handlers[props.node] = errorHtml;

        })();

        return props;

    };

};
