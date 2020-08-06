/**
 * @function run
 * ---
 * Utility adapater for invoking a given function depending on the current lifecycle state
 * of the component.
 */
export default function run({ lifecycle }) {
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
    };
}
