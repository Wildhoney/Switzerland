import { h } from '../../core/superfine.js';

const trees = new WeakMap();

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
 * @function sheet ∷ View v ⇒ String → String → v
 */
export const sheet = (path, mediaQuery = '') =>
    h(
        'style',
        { key: path, type: 'text/css' },
        `@import "${path}" ${mediaQuery}`.trim() + ';'
    );

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
