import { h } from 'https://cdn.jsdelivr.net/npm/superfine@6.0.1/src/index.js';

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
 * @function camelToKebab ∷ String → String
 */
export const camelToKebab = value =>
    value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * @function bindElements ∷ ∀ a b. → Object String a → Object String b
 */
export const bindElements = ({ render }) => {
    const stylesheet = (path, mediaQuery = '') =>
        h(
            'style',
            { key: path, type: 'text/css' },
            `@import "${path}" ${mediaQuery}`.trim() + ';'
        );

    const variables = model => {
        const vars = Object.entries(model).reduce(
            (accum, [key, value]) =>
                `${accum} --${camelToKebab(key)}: ${value};`,
            ''
        );
        return h('style', { type: 'text/css' }, `:host { ${vars} }`);
    };

    const input = (name, attrs = {}) =>
        h('input', {
            ...attrs,
            name,
            oninput: render,
            oncreate: node => render({ [`${name}Input`]: node })
        });

    const textarea = (name, attrs = {}) =>
        h('textarea', {
            ...attrs,
            name,
            oninput: render,
            oncreate: node => render({ [`${name}Textarea`]: node })
        });

    const form = (name, attrs = {}, children = []) =>
        h(
            'form',
            {
                ...attrs,
                name,
                oncreate: node => render({ [`${name}Form`]: node })
            },
            children
        );

    return { stylesheet, variables, input, textarea, form };
};
