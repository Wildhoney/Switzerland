import { SwitzerlandServer } from '../../core/impl/index.js';

/**
 * @constant styles ∷ WeakMap
 */
export const styles = new WeakMap();

/**
 * @function toKebab ∷ String → String
 */
export const toKebab = (value) => value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * @function sheet ∷ ∀ a. HTMLElement e, View v ⇒ e → String → String → v → Object String a
 */
export const sheet = (node) => (path, mediaQuery = '', attrs = {}) => {
    let setLoaded = () => {};

    return h(
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
    return h('style', { type: 'text/css' }, `:host { ${vars} }`);
};

function isComponent(tree) {
    return tree?.name instanceof SwitzerlandServer;
}

async function getNode(tree) {
    if (isComponent(tree)) return tree.name.render(tree.props);

    try {
        const dom = await import('jsdom');
        const { window } = new dom.default.JSDOM();

        return tree.type === 3
            ? window.document.createTextNode(tree.name)
            : window.document.createElement(tree.name);
    } catch {
        return tree.type === 3
            ? window.document.createTextNode(tree.name)
            : window.document.createElement(tree.name);
    }
}

export async function renderToDOM(tree) {
    const node = await getNode(tree);

    // Iterate over each attribute and apply that to the node if it's not a component.
    Object.entries(tree.props).forEach(([key, value]) => {
        if (typeof value === 'function') return;
        node.setAttribute(key, value);
    });

    // Iterate over each of the children and yield a node with the HTML content.
    for (tree of tree.children) {
        const child = await renderToDOM(tree);
        node.appendChild(child);
    }

    return node;
}

const createVNode = function (name, props, children, node, key, type) {
    return {
        name: name,
        props: props,
        children: children,
        node: node,
        type: type,
        key: key,
    };
};

const createTextVNode = function (value, node) {
    return createVNode(value, {}, [], node, null, 3);
};

export const h = function (name, props) {
    for (var vnode, rest = [], children = [], i = arguments.length; i-- > 2; ) {
        rest.push(arguments[i]);
    }

    while (rest.length > 0) {
        if (Array.isArray((vnode = rest.pop()))) {
            for (var i = vnode.length; i-- > 0; ) {
                rest.push(vnode[i]);
            }
        } else if (vnode === false || vnode === true || vnode == null) {
        } else {
            children.push(typeof vnode === 'object' ? vnode : createTextVNode(vnode));
        }
    }

    props = props || {};

    return typeof name === 'function'
        ? name(props, children)
        : createVNode(name, props, children, null, props.key);
};
