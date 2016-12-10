import { merge, __ } from 'ramda';
import { options } from '../switzerland';

/**
 * @constant once
 * @type {WeakMap}
 */
const once = new WeakMap();

/**
 * @param {Function} fn
 * @param {Number} [flags = options.DEFAULT]
 * @return {Function}
 */
export default (fn, flags = options.DEFAULT) => {

    return props => {

        const key = props.node;

        // Ensure the node has an entry in the map.
        const hasNode = once.has(key);
        !hasNode && once.set(key, new WeakMap());

        // Determine whether the function has been called already.
        const hasFunction = once.get(key).has(fn);
        !hasFunction && once.get(key).set(fn, fn(props));

        // Only promises will be yielded in the next tick, whereas functions that
        // yield objects will return immediately.
        const response = once.get(key).get(fn);

        // Remove the callback if the node has been deleted, which will cause it to be invoked
        // again if the node is re-added.
        flags & options.RESET && !props.attached && once.get(key).delete(fn);

        return 'then' in Object(response) ? response.then(merge(__, props)) : { ...response, ...props };

    };

};
