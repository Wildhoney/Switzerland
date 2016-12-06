/**
 * @constant handlers
 * @type {WeakMap}
 */
const handlers = new WeakMap();

/**
 * @method htmlErrorFor
 * @return {Object}
 */
export const htmlErrorFor = node => handlers.get(node);

/**
 * @param {Function} html
 * @return {Function}
 */
export default html => {

    return props => {

        // Assign the HTML error function to the node if it hasn't yet been defined.
        !handlers.has[props.node] && handlers.set(props.node, html);

        return props;

    };

};
