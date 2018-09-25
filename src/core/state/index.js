const states = new WeakMap();

const normal = Symbol('normal');
const error = Symbol('error');

export default node => {
    states.set(node, normal);
    return {
        isError: () => states[node] === error,
        setNormal: () => states.set(node, normal),
        setError: () => states.set(node, error)
    };
};
