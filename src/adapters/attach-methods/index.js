/**
 * @function attachMethods
 * ---
 * Takes a map of function names to functions, and attaches them to the node, which allows you to directly
 * invoke the functions once you have a reference to the node. Using the 'methods' middleware passes the arguments
 * as-is, but also passes the current set of props as the final argument.
 */

export default function attachMethods({ node }) {
    return (fns) => {
        Object.entries(fns).forEach(
            // Iterate over each of the functions and bind them to the node.
            ([name, fn]) => (node[name] = (...args) => fn.call(node, ...args, node))
        );
    };
}
