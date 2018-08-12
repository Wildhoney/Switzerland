import { u } from '@switzerland/core';

const trees = new WeakMap();
const roots = new WeakMap();

const defaultOptions = { mode: 'open', delegatesFocus: false };

/**
 * @function createShadowRoot ∷ ∀ a. ShadowRoot s, HTMLElement e ⇒ Object e → Object String a → s|e
 * ---
 * Takes the node element and attaches the shadow boundary to it if it doesn't exist
 * already. Returns the node if a shadow boundary cannot be attached to the element.
 */
export const createShadowRoot = ({ node }, options = {}) => {
    if (roots.has(node)) {
        return roots.get(node);
    }

    try {
        const root = node.attachShadow({ ...defaultOptions, ...options });
        roots.set(node, root);
        return root;
    } catch (err) {
        return node;
    }
};

/**
 * @function getNodeName ∷ String → String
 */
const getNodeName = name => {
    const tag = name.replace(/^_/, '');
    const namespace = u.getNamespace();
    return namespace ? `${namespace}_${tag}` : tag;
};

/**
 * @function parseNodeName ∷ String → String
 */
const parseNodeName = name => {
    const isSwissComponent = String(name).startsWith('_');
    return isSwissComponent ? getNodeName(name) : name;
};

/**
 * @function isElement ∷ Integer → Boolean
 */
const isElement = type => type === 0;

/**
 * @function parseView ∷ View v ⇒ v → v
 */
export const parseView = view => {
    const hasChildren = view.children && view.children.length > 0;
    return {
        ...view,
        name: isElement(view.type) ? parseNodeName(view.name) : view.name,
        children: hasChildren ? view.children.map(parseView) : view.children
    };
};

/**
 * @function putTree ∷ HTMLElement e, Tree t ⇒ e → t → void
 */
export const putTree = (node, tree) => {
    trees.set(node, tree);
};

/**
 * @function takeTree ∷ HTMLElement e, ShadowRoot s ⇒ e → s|e
 */
export const takeTree = node => {
    return trees.get(node);
};
