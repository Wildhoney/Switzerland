/**
 * @constant once
 * @type {WeakMap}
 */
const once = new WeakMap();

/**
 * @param {Function} callback
 * @param {Function} [keyFrom]
 * @return {Function}
 */
export default (callback, keyFrom = props => props.node) => {

    return props => {

        const key = keyFrom(props);

        // Ensure the node has an entry in the map.
        const hasNode = once.has(key);
        !hasNode && once.set(key, new WeakMap());

        // Determine whether the function has been called already.
        const hasFunction = once.get(key).has(callback);
        !hasFunction && once.get(key).set(callback, callback(props));

        return Promise.resolve(once.get(key).get(callback)).then(onceProps => {

            return { ...onceProps, ...props };

        });

    };

};
