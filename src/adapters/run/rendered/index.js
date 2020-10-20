const batch = new WeakMap();

/**
 * @function runBatchedFunctions
 * ---
 * Runs any batched functions once the DOM has been updated, and then clears the queue
 * in anticipation of the next render.
 */
export function runBatchedFunctions(node) {
    const fns = Array.from(batch.get(node) ?? []);
    fns.forEach((fn) => fn());
    batch.get(node)?.clear();
}

export default function rendered({ node }) {
    return (fn) => {
        !batch.has(node) && batch.set(node, new Set());
        batch.get(node).add(fn);
    };
}
