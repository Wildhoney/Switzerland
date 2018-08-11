const trees = new WeakMap();
const roots = new WeakMap();

/**
 * @function createShadowRoot ∷ s ShadowRoot, e HTMLElement ⇒ e → s|e
 * ---
 * Takes the node element and attaches the shadow boundary to it if it doesn't exist
 * already. Returns the node if a shadow boundary cannot be attached to the element.
 */
export const createShadowRoot = ({ node }) => {
    if (roots.has(node)) {
        return roots.get(node);
    }

    try {
        const root = node.attachShadow({ mode: 'open' });
        roots.set(node, root);
        return root;
    } catch (err) {
        return node;
    }
};

export const putTree = (node, tree) => {
    trees.set(node, tree);
};

export const takeTree = node => {
    return trees.get(node);
};
