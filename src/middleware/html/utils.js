import { Swiss } from '../../core/impl/index.js';
import { fromCamelcase } from '../../core/utils.js';
import { getWindow } from '../../utils.js';

const eventListeners = new WeakMap();

export const events = Symbol('switzerland/events');

export function createVNode(name, props = {}, ...children) {
    return {
        name,
        props,
        children: children.flat(),
    };
}

export async function getNode(tree) {
    const window = await getWindow();

    // Null values should yield to empty strings.
    if (tree == null) return window.document.createTextNode('');

    // Children can be passed through as just string representations.
    if (typeof tree !== 'object') return window.document.createTextNode(String(tree));

    // Delegate to a whole new Swiss custom element.
    if (tree.name instanceof Swiss) return await tree.name.render(tree.props);

    // Otherwise it's a standard element.
    return window.document.createElement(tree.name);
}

export async function getVNodeFragment(...nodes) {
    const window = await getWindow();
    const children = [].concat(nodes.flat());

    // Append all of the nodes to the document fragment.
    const fragment = window.document.createDocumentFragment();
    children.forEach((node) => fragment.appendChild(node));

    return fragment;
}

function isEvent(key, value) {
    return key.startsWith('on') && typeof value === 'function';
}

export async function getVNodeDOM(tree) {
    if (typeof tree.name === 'function') {
        // Gather the sub-tree by invoking the function.
        const subTree = tree.name({ ...tree.props, children: tree.children });

        // If the sub-tree sends us an array then we'll iterate over that to resolve each node.
        if (Array.isArray(subTree)) return (await Promise.all(subTree.map(getVNodeDOM))).flat();

        return getVNodeDOM(subTree);
    }

    // When passed an array of trees we'll cycle through each one.
    if (Array.isArray(tree)) return (await Promise.all(tree.map(getVNodeDOM))).flat();

    // Create the node from the given tree.
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
    for (const subTree of [].concat(tree?.children ?? [])) {
        const children = await getVNodeDOM(subTree);
        [].concat(children).forEach((child) => node.appendChild(child));
    }

    function attachEventListeners(node) {
        // Remove all of the existing event listeners from the node.
        detatchEventListeners(node);

        tree?.props &&
            Object.entries(tree.props).forEach(([key, value]) => {
                if (!isEvent(key, value)) return;

                // Attach all of the required events to the given node.
                const name = fromCamelcase(key.substr(2)).toKebab().substr(1);
                node.addEventListener(name, value);

                // Memorise the events so that can be removed later if necessary.
                !eventListeners.get(node) && eventListeners.set(node, new Set());
                eventListeners.get(node).add({ name, fn: value });
            });
    }

    function detatchEventListeners(node) {
        // Remove all of the events currently bound to the node.
        const listeners = eventListeners.get(node) ?? [];
        [...listeners].forEach((listener) => {
            eventListeners.get(node).delete(listener);
            node.removeEventListener(listener.name, listener.fn);
        });
    }

    node.attachEventListeners = attachEventListeners;
    node.detatchEventListeners = detatchEventListeners;

    return node;
}
