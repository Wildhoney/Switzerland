const trees = new WeakMap();
const roots = new WeakMap();

export const createShadowRoot = ({ node }) => {

    if (roots.has(node)) {
        return roots.get(node);
    }

    try {
        const root = node.attachShadow({ mode: "open"});
        roots.set(node, root)
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
