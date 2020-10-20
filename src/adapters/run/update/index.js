export default function update({ lifecycle }) {
    return (fn) => {
        lifecycle === 'update' && fn();
    };
}
