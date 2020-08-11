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

/**
 * @function run
 * ---
 * Utility adapater for invoking a given function depending on the current lifecycle state
 * of the component.
 */
export default function run({ node, lifecycle }) {
    return {
        onMount(fn) {
            lifecycle === 'mount' && fn();
        },
        onUnmount(fn) {
            lifecycle === 'unmount' && fn();
        },
        onUpdate(fn) {
            lifecycle === 'update' && fn();
        },
        onRender(fn) {
            !batch.has(node) && batch.set(node, new Set());
            batch.get(node).add(fn);
        },
    };
}
