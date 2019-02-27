import { h } from 'https://cdn.jsdelivr.net/npm/superfine@6.0.1/src/index.js';
import * as u from '../../core/utils.js';

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

/**
 * @function treeContainsForm ∷ Tree t ⇒ t → Boolean
 */
export const treeContainsForm = tree => {
    const tree_ = Object(tree);
    const isForm = tree_.name === 'form';
    return isForm
        ? true
        : tree.children.some(subTree => treeContainsForm(subTree) === true);
};

/**
//  * @function isMultiplePass ∷ Number → Boolean
 */
export const parseForms = forms =>
    [...forms].reduce((accum, form) => {
        const name = u.toCamelcase(form.getAttribute('name')).fromKebab();
        return { ...accum, [name]: form };
    }, {});

export const isFirst = a => a === 1;
