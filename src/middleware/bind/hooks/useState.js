import * as utils from '../utils.js';

export const values = new WeakMap();

export function useState({ node, render }) {
    return (value) => {
        const key = utils.getKey();

        !values.has(node) && values.set(node, new Map());
        const storage = values.get(node);

        const setValue = (value) => (storage.set(key, value), render());
        return [storage.get(key) ?? value, setValue];
    };
}
