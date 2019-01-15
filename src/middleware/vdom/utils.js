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

export const capitalise = value =>
    `${value.charAt(0).toUpperCase()}${value.slice(1)}`;

/**
 * @function camelToKebab ∷ String → String
 */
export const camelToKebab = value =>
    value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * @function bindElements ∷ ∀ a b. → Object String a → Object String b
 */
export const bindElements = ({ render }) => {
    const isCheckable = type => ['checkbox', 'radio'].includes(type);

    const sheet = (path, mediaQuery = '') =>
        h(
            'style',
            { key: path, type: 'text/css' },
            `@import "${path}" ${mediaQuery}`.trim() + ';'
        );

    const vars = model => {
        const vars = Object.entries(model).reduce(
            (accum, [key, value]) =>
                `${accum} --${camelToKebab(key)}: ${value};`,
            ''
        );
        return h('style', { type: 'text/css' }, `:host { ${vars} }`);
    };

    const form = (attrs = {}, children = []) =>
        h(
            'form',
            {
                ...attrs,
                oncreate: !attrs.name
                    ? attrs.oncreate
                    : node => render({ [`${attrs.name}Form`]: node })
            },
            children
        );

    const field = (name, attrs = {}, children = []) =>
        h(
            name,
            {
                ...attrs,
                oninput: attrs.name && render,
                oncreate: !attrs.name
                    ? attrs.oncreate
                    : node => {
                          node.update = value => {
                              isCheckable(attrs.type)
                                  ? (node.checked = value)
                                  : (node.value = value);
                              render();
                          };
                          render({
                              [`${attrs.name}${capitalise(name)}`]: node
                          });
                      }
            },
            children
        );

    return { sheet, vars, form, field };
};
