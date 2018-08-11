const map = new WeakMap();

export const putTree = (node, tree) => {
    map.set(node, tree);
};

export const takeTree = node => {
    return map.get(node);
};
