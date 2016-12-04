/**
 * @constant htmlErrorKey
 * @type {Symbol}
 */
const htmlErrorKey = Symbol('switzerland/html-error');

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

        !props.node[htmlErrorKey] && (() => {

            // Assign the HTML error function to the node if it hasn't yet been defined.
            props.node[htmlErrorKey] = errorHtml;

        })();

        return props;

    };

};
