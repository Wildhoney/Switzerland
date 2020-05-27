import { Swiss } from '../../core/impl/index.js';
import { fromCamelcase } from '../../core/utils.js';

const eventListeners = new WeakMap();

export const styleSheets = new WeakMap();

export function createVNode(node) {
    function createVNode(name, props = {}, children = []) {
        return {
            name,
            props,
            children,
        };
    }

    createVNode.styleSheet = createStyleVNode(node, createVNode);

    return createVNode;
}

export function createStyleVNode(node, createVNode) {
    return (path, mediaQuery = '', attrs = {}) => {
        let setLoaded = () => {};

        return createVNode(
            'style',
            {
                ...attrs,
                key: path,
                type: 'text/css',
                onCreate: () => {
                    !styleSheets.has(node) && styleSheets.set(node, new Set());
                    styleSheets.get(node).add(new Promise((resolve) => (setLoaded = resolve)));
                },
                onLoad: () => setLoaded(),
                onError: () => setLoaded(),
            },
            `@import "${path}" ${mediaQuery}`.trim() + ';'
        );
    };
}

export async function getNode(tree) {
    // Null values should yield to empty strings.
    if (tree == null) return document.createTextNode('');

    // Children can be passed through as just string representations.
    if (typeof tree !== 'object') return document.createTextNode(String(tree));

    // Delegate to a whole new Swiss custom element.
    if (tree.name instanceof Swiss) return tree.name.render();

    // Delegate to a localised function.
    if (typeof tree === 'function') return tree(tree.props);

    // Otherwise it's a standard element.
    return document.createElement(tree.name);
}

export async function getVNodeDOM(tree) {
    const node = await getNode(tree);

    // Iterate over each attribute and apply that to the node if it's not a component.
    tree?.props &&
        Object.entries(tree.props).forEach(([key, value]) => {
            if (typeof value === 'function') return;
            if (typeof value === 'boolean') {
                value === true && node.setAttribute(key, '');
                return;
            }

            node.setAttribute(key, value);
        });

    // Iterate over each of the children and yield a node with the HTML content.
    for (tree of [].concat(tree?.children ?? [])) {
        const child = await getVNodeDOM(tree);
        node.appendChild(child);
    }

    return node;
}

export function attachEventListeners(tree, node) {
    const listeners = eventListeners.get(node) ?? [];

    // Remove all of the existing event listeners from the node.
    [...listeners].forEach((listener) => {
        eventListeners.get(node).delete(listener);
        node.removeEventListener(listener.type, listener.fn);
    });

    // Add any event listeners that the tree contains.
    tree?.props &&
        Object.entries(tree.props).forEach(([key, value]) => {
            const isEvent = key.startsWith('on') && typeof value === 'function';

            if (isEvent) {
                const type = fromCamelcase(key.substr(2)).toKebab().substr(1);
                node.addEventListener(type, value);

                !eventListeners.get(node) && eventListeners.set(node, new Set());
                eventListeners.get(node).add({ type, fn: value });
            }
        });

    (tree?.children ? [].concat(tree.children) : []).forEach((tree, index) => {
        attachEventListeners(tree, node.childNodes[index]);
    });
}
