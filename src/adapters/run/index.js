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
