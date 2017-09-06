/**
 * @constant registry
 * @type {WeakMap}
 */
const registry = new WeakMap();

/**
 * @method putState
 * @param {Object} tree
 * @param {Object} root
 * @param {Object} prevProps
 * @return {void}
 */
export function putState(node, tree, root, prevProps) {
    registry.set(node, { prevProps, vDomTree: { tree, root } });
}

/**
 * @method takeVDomTree
 * @param {HTMLElement} node
 * @return {Object|null}
 */
export function takeVDomTree(node) {
    const state = Object(registry.get(node));
    return state.vDomTree || null;
}

/**
 * @method takePrevProps
 * @param {HTMLElement} node
 * @return {Object|null}
 */
export function takePrevProps(node) {
    const state = Object(registry.get(node));
    return state.prevProps || null;
}
