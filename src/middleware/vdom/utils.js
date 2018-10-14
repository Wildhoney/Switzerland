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
