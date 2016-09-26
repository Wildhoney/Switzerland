/**
 * @constant once
 * @type {WeakMap}
 */
const once = new WeakMap();

/**
 * @param {Function} callback
 * @return {Function}
 */
export default callback => {

    return props => {

        // Ensure the node has an entry in the map.
        const hasNode = once.has(props.node);
        !hasNode && once.set(props.node, new WeakMap());

        // Determine whether the function has been called already.
        const hasFunction = once.get(props.node).has(callback);
        !hasFunction && once.get(props.node).set(callback, callback(props));

        return { ...props, ...once.get(props.node).get(callback) };

    };

};
