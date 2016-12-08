import { options } from '../switzerland';
import { isOk, isError } from '../helpers/status';

/**
 * @constant once
 * @type {WeakMap}
 */
const once = new WeakMap();

/**
 * @param {Function} callback
 * @param {Number} [flags = options.DEFAULT]
 * @return {Function}
 */
export default (callback, flags = options.DEFAULT) => {

    return props => {

        const key = props.node;

        // Ensure the node has an entry in the map.
        const hasNode = once.has(key);
        !hasNode && once.set(key, new WeakMap());

        // Determine whether the function has been called already.
        const hasFunction = once.get(key).has(callback);
        isOk(props) && !hasFunction && once.get(key).set(callback, callback(props));

        // Only promises will be yielded in the next tick, whereas functions that
        // yield objects will return immediately.
        const response = once.get(key).get(callback) || (isError(props) && callback(props));

        // Remove the callback if the node has been deleted, which will cause it to be invoked
        // again if the node is re-added.
        flags & options.RESET && !props.attached && once.get(key).delete(callback);

        return 'then' in Object(response) ? response.then(onceProps => ({ ...onceProps, ...props })) :
                                            { ...response, ...props };

    };

};
