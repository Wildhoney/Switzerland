export const values = new WeakMap();

export const useState = ({ node, render }) => value => {
    !values.has(node) && values.set(node, new Map());
    const storage = values.get(node);

    try {
        throw new Error();
    } catch (error) {
        const key = error.stack.split('\n')[2];
        const setValue = value => (storage.set(key, value), render());
        return [storage.get(key) || value, setValue];
    }
};
