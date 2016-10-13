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

        if (hasFunction) {

            // If the `once` function has already been invoked, we'll use it by
            // overriding new props with the cached props.
            return { ...once.get(key).get(callback), ...props };

        }

        return Promise.resolve(callback(props)).then(onceProps => {

            !hasFunction && once.get(key).set(callback, onceProps);
            return { ...onceProps, ...props };

        });

    };

};
