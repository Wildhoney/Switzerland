/**
 * @constant refs
 * @type {WeakMap}
 */
const refs = new WeakMap();

/**
 * Invoke each defined refs once the node(s) have been appended to the DOM. This is
 * in contract to Virtual DOM's default behaviour which invokes refs without them
 * being in the DOM. This of course causes issues for props that rely on a node's
 * presence in the DOM, such as a node's dimensions.
 *
 * @method invokeFor
 * @props {HTMLElement} node
 * @return {Array}
 */
export const invokeFor = node => {

    const refsLocal = refs.get(node) || [];

    // Iterate over each defined refs and invoke it.
    Array.from(refsLocal.keys()).forEach(key => {
        refsLocal.get(key)(key);
    });

};

/**
 * Responsible for purging all of a node's defined refs.
 *
 * @method purgeFor
 * @param {HTMLElement} node
 * @return {void}
 */
export const purgeFor = node => {
    const refsLocal = refs.get(node);
    refsLocal && refsLocal.clear(node);
};

/**
 * @param {Object} props
 * @return {Object}
 */
export default props => {

    const has = refs.has(props.node);
    !has && refs.set(props.node, new Map());
    const refsLocal = refs.get(props.node);

    const ref = fn => {

        // See: https://github.com/Matt-Esch/virtual-dom/blob/master/docs/hooks.md
        const Hook = function () {};
        Hook.prototype.hook = node => refsLocal.set(node, fn);
        return new Hook();

    };

    // Delete the refs if the node has been removed from the DOM.
    has && !props.node.isConnected && refs.delete(props.node);

    return { ...props, ref };

};
