import { h } from 'https://cdn.jsdelivr.net/npm/superfine@6.0.1/src/index.js';

const trees = new WeakMap();

export const styles = new WeakMap();

/**
 * @function putTree ∷ HTMLElement e, View v ⇒ e → v → void
 */
export const putTree = (node, view) => {
    trees.set(node, view);
};

/**
 * @function takeTree ∷ HTMLElement e, ShadowRoot s ⇒ e → s|e
 */
export const takeTree = node => {
    return trees.get(node);
};

/**
 * @function toKebab ∷ String → String
 */
const toKebab = value => {
    return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

/**
 * @function sheet ∷ HTMLElement e, View v ⇒ e → String → String → v
 */
export const sheet = node => (path, mediaQuery = '') => {
    let setLoaded;
    !styles.has(node) && styles.set(node, new Set());
    styles.get(node).add(new Promise(resolve => (setLoaded = resolve)));

    return h(
        'style',
        {
            key: path,
            type: 'text/css',
            onload: setLoaded
        },
        `@import "${path}" ${mediaQuery}`.trim() + ';'
    );
};

/**
 * @function vars ∷ ∀ a. Object String a. View v ⇒ Object String a → v
 */
export const vars = model => {
    const vars = Object.entries(model).reduce(
        (accum, [key, value]) => `${accum} --${toKebab(key)}: ${value};`,
        ''
    );
    return h('style', { type: 'text/css' }, `:host { ${vars} }`);
};
