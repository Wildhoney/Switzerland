/**
 * @constant registry ∷ Map
 */
const registry = new Map();

/**
 * @function once ∷ Props p ⇒ (p → p) → (p → Promise p)
 * ---
 * Takes a function and an optional strategy that allows for the passed function to be invoked only once per instance
 * of the component, which is useful for one-off functionality, such as being used as a constructor or initialiser, or
 * cleaning up when the node is removed from DOM.
 */
export default function once(fn) {
    return async props => {
        const { node } = props;
        !registry.has(node) && registry.set(node, new WeakMap());
        const functions = registry.get(node);
        const result = functions.has(fn) ? functions.get(fn) : fn(props);
        functions.set(fn, result);
        return { ...(await result), ...props };
    };
}
