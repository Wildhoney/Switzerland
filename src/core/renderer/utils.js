import { Swiss } from '../../core/impl/index.js';
import { fromCamelcase } from '../../core/utils.js';
import { getWindow } from '../../utils.js';

const eventListeners = new WeakMap();

export const events = Symbol('switzerland/events');

/**
 * @function createVNode
 * ---
 * Creates a VNode for representing the DOM virtually.
 */
export function createVNode(name, props = {}, ...children) {
    return {
        name,
        props: typeof name === 'string' ? getProps(props) : props,
        children: children.flat(),
    };
}

/**
 * @function getVNodeFragment
 * ---
 * Grabs the DOM and ensures it's able to be rendered by both server-side and client-side
 * implementations.
 */
export async function getVNodeFragment(...nodes) {
    const window = await getWindow();
    const children = [].concat(nodes.flat());

    // Append all of the nodes to the document fragment.
    const fragment = window.document.createDocumentFragment();
    children.forEach((node) => fragment.appendChild(node));

    return fragment;
}

/**
 * @function getProps
 * ---
 * Recursively flattens the props so that you're able to pass a nested object that's reduced
 * to a string with the nested prop name.
 */
export function getProps(props) {
    return Object.entries(props).reduce((props, [key, value]) => {
        if (typeof value === 'object') {
            const mergedProps = Object.entries(value).reduce((props, prop) => {
                const item = getProps({ [`${key}-${prop[0]}`]: prop[1] });
                return { ...props, ...item };
            }, {});

            return { ...props, ...mergedProps };
        }

        return { ...props, [key]: value };
    }, {});
}

/**
 * @function getNode
 * ---
 * Able to handle and yield text nodes, Swiss nodes and general HTML nodes.
 */
export async function getNode(tree, options) {
    const window = await getWindow();

    // Null values should yield to empty strings.
    if (tree == null) return window.document.createTextNode('');

    // Children can be passed through as just string representations.
    if (typeof tree !== 'object') return window.document.createTextNode(String(tree));

    // Delegate to a whole new Swiss custom element.
    if (tree.name instanceof Swiss)
        // Render the nested Swiss component that is effectively a new custom element.
        return tree.name.render(tree.props, options);

    // Otherwise it's a standard element.
    return window.document.createElement(tree.name);
}

/**
 * @function createVNodeFragment
 * ---
 * Determines whether a prop is an event listener that needs to be attached.
 */
export function isEvent(key, value) {
    return key.startsWith('on') && typeof value === 'function';
}

/**
 * @function attachEventListeners
 * ---
 * Attaches all of the event listeners when passed a tree.
 */
export function attachEventListeners(tree) {
    return (node) => {
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
    };
}

/**
 * @function detatchEventListeners
 * ---
 * Detatches all of the attached event listeners for the supplied node.
 */
export function detatchEventListeners(node) {
    // Remove all of the events currently bound to the node.
    const listeners = eventListeners.get(node) ?? [];

    [...listeners].forEach((listener) => {
        eventListeners.get(node).delete(listener);
        node.removeEventListener(listener.name, listener.fn);
    });
}

/**
 * @function getVNodeDOM
 * ---
 * Parses the virtual DOM tree and yields the HTML for diffing by MorphDOM.
 */
export async function getVNodeDOM(tree, options) {
    if (typeof tree.name === 'function') {
        // Gather the sub-tree by invoking the function.
        const subTree = tree.name({ ...tree.props, children: tree.children });

        // If the sub-tree sends us an array then we'll iterate over that to resolve each node.
        if (Array.isArray(subTree))
            return (await Promise.all(subTree.map((tree) => getVNodeDOM(tree, options)))).flat();

        return getVNodeDOM(subTree, options);
    }

    // When passed an array of trees we'll cycle through each one.
    if (Array.isArray(tree)) return (await Promise.all(tree.map((tree) => getVNodeDOM(tree, options)))).flat();

    // Create the node from the given tree.
    const node = await getNode(tree, options);

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
        const children = await getVNodeDOM(subTree, options);
        [].concat(children).forEach((child) => node.appendChild(child));
    }

    node.attachEventListeners = attachEventListeners(tree);
    node.detatchEventListeners = detatchEventListeners;

    return node;
}
