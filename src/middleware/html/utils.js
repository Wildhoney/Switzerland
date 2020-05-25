import superfine from 'superfine';
import dom from 'jsdom';

/**
 * @constant trees ∷ WeakMap
 */
const trees = new WeakMap();

/**
 * @constant styles ∷ WeakMap
 */
export const styles = new WeakMap();

/**
 * @function putTree ∷ HTMLElement e, View v ⇒ e → v → void
 */
export const putTree = (node, view) => trees.set(node, view);

/**
 * @function takeTree ∷ HTMLElement e, ShadowRoot s ⇒ e → s|e
 */
export const takeTree = (node) => trees.get(node);

/**
 * @function toKebab ∷ String → String
 */
export const toKebab = (value) => value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * @function sheet ∷ ∀ a. HTMLElement e, View v ⇒ e → String → String → v → Object String a
 */
export const sheet = (node) => (path, mediaQuery = '', attrs = {}) => {
    let setLoaded = () => {};

    return superfine.h(
        'style',
        {
            ...attrs,
            key: path,
            type: 'text/css',
            oncreate: () => {
                !styles.has(node) && styles.set(node, new Set());
                styles.get(node).add(new Promise((resolve) => (setLoaded = resolve)));
            },
            onerror: () => setLoaded(),
            onload: () => setLoaded(),
        },
        `@import "${path}" ${mediaQuery}`.trim() + ';'
    );
};

/**
 * @function vars ∷ ∀ a. Object String a. View v ⇒ Object String a → v
 */
export const vars = (model) => {
    const vars = Object.entries(model).reduce(
        (accum, [key, value]) => `${accum} --${toKebab(key)}: ${value};`,
        ''
    );
    return superfine.h('style', { type: 'text/css' }, `:host { ${vars} }`);
};

function getNode({ name, type }) {
    const { window } = new dom.JSDOM();

    return type === 3 ? window.document.createTextNode(name) : window.document.createElement(name);
}

export function renderToDOM(tree) {
    const node = getNode(tree);

    Object.entries(tree.props).forEach(([key, value]) => {
        if (typeof value === "function") return;
        node.setAttribute(key, value)
    });

    tree.children.forEach((tree) => {
        const childNode = renderToDOM(tree);
        node.appendChild(childNode);
    });

    return node;
}
