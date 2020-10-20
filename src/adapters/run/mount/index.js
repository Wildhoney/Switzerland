export default function mount({ lifecycle }) {
    return (fn) => {
        lifecycle === 'mount' && fn();
    };
}
