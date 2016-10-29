/**
 * @constant awaitKey
 * @type {Symbol}
 */
export const awaitKey = Symbol('switzerland/await');

/**
 * @constant awaitEventName
 * @type {String}
 */
export const awaitEventName = 'switzerland/node-resolved';

/**
 * @method hasResolvedTree
 * @param {Object} props
 * @return {Promise}
 */
export const hasResolvedTree = props => {

    const waitFor = new Map();
    const { node } = props;
    const boundary = node.shadowRoot;

    return awaitKey in props ? new Promise(resolve => {

        node.addEventListener(awaitEventName, function resolved(event) {

            // Resolve the current node if we have it in the map.
            waitFor.has(event.detail) && waitFor.set(event.detail, true);

            // Determine whether all awaiting nodes have been resolved.
            Array.from(waitFor.values()).every(resolved => resolved === true) && (() => {

                // Tree has been resolved.
                node.removeEventListener(awaitEventName, resolved);
                resolve();

            })();

        });

        // Place all of the nodes we're awaiting into the map.
        const nodes = boundary.querySelectorAll(props[awaitKey].join(','));
        Array.from(nodes).forEach(awaitNode => waitFor.set(awaitNode, false));

    }) : Promise.resolve();

};

/**
 * @method resolved
 * @param {HTMLElement} node
 * @return {Promise}
 */
export const resolved = node => {

    return new Promise(resolve => {

        node.addEventListener(awaitEventName, function resolved(event) {

            if (event.detail === node) {
                node.removeEventListener(awaitEventName, resolved);
                node.resolved.then(() => resolve(node));
            }

        });

    });

};

/**
 * @param {String[]|String} nodes
 * @return {Function}
 */
export default (...nodes) => {

    const nodeTags = Array.isArray(nodes) ? nodes : [nodes];

    return props => {
        return { ...props, [awaitKey]: nodeTags };
    };

};
