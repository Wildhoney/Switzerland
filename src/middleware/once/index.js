/**
 * @constant types ∷ Object String Symbol
 */
export const types = {
    ONLY: Symbol('only'),
    ON_MOUNT: Symbol('mount'),
    ON_UNMOUNT: Symbol('unmount')
};

/**
 * @constant caches ∷ Map
 */
const caches = new Map();

/**
 * @function once ∷ Props p ⇒ (p → p) → Symbol → (p → Promise p)
 * ---
 * Takes a function and an optional strategy that allows for the passed function to be invoked only once per instance
 * of the component, which is useful for one-off functionality, such as being used as a constructor or initialiser, or
 * cleaning up when the node is removed from DOM.
 *
 * With the optional second parameter you can specify the strategy:
 *
 *  - ONCE.ONLY: Default functionality which invokes the supplied function once and once only.
 *  - ONCE.ON_MOUNT: Invokes the function once per mounting of the associated component.
 *  - ONCE.ON_UNMOUNT: Same as above except it's once per unmounting.
 *
 * Using the second and third strategies, multiple mounting and unmounting of the node will cause the function
 * to be invoked multiple times, but not on a simple refresh of the component's contents.
 */
export default function once(fn, strategy = types.ONLY) {
    caches.set(fn, new Set());
    const cache = caches.get(fn);
    const maybeInvoke = (fn, props) => {
        if (cache.has(props.node)) {
            return props;
        }

        const result = fn(props);
        cache.add(props.node);
        return result;
    };

    return async props => {
        if (props.node.isConnected) {
            const result =
                strategy !== types.ON_UNMOUNT && (await maybeInvoke(fn, props));
            strategy === types.ON_UNMOUNT && cache.delete(props.node);
            return { ...result, ...props };
        }

        const result = await maybeInvoke(fn, props);
        strategy === types.ON_MOUNT && cache.delete(props.node);
        return { ...result, ...props };
    };
}
