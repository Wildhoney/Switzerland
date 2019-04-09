/**
 * @constant nodes ∷ Map
 */
const nodes = new Map();

/**
 * @function once ∷ Props p ⇒ (p → p) → (p → Promise p)
 * ---
 * Takes a function and an optional strategy that allows for the passed function to be invoked only once per instance
 * of the component, which is useful for one-off functionality, such as being used as a constructor or initialiser, or
 * cleaning up when the node is removed from DOM.
 */
export default fn => {
    const once = async function once(props) {
        const { node } = props;
        !nodes.has(node) && nodes.set(node, new WeakMap());
        const functions = nodes.get(node);
        const result = functions.has(fn) ? functions.get(fn) : fn(props);
        functions.set(fn, result);
        return { ...(await result), ...props };
    };

    // Enhance the `once` middleware function with the wrapped function name, if available.
    fn.name && Object.defineProperty(once, 'name', { value: `once(${fn.name})` });

    return once;
};
