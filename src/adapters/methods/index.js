/**
 * @function methods
 * ---
 * Takes a map of function names to functions, and attaches them to the node which allows you to directly
 * invoke the functions once you have a reference to the node. Using the 'attachMethods' adapters passes the arguments
 * as-is but also passes the node is the final argument so you have access to the render method.
 */

export default function methods({ node }) {
    return (fns) => {
        Object.entries(fns).forEach(
            // Iterate over each of the functions and bind them to the node.
            ([name, fn]) => (node[name] = (...args) => fn.call(node, ...args, node))
        );
    };
}
