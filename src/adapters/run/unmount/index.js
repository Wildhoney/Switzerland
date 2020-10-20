export default function unmount({ lifecycle }) {
    return (fn) => {
        lifecycle === 'unmount' && fn();
    };
}
