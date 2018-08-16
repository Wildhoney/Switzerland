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
