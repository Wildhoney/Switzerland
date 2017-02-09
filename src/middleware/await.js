/**
 * @constant awaitKey
 * @type {Symbol}
 */
export const awaitKey = Symbol('switzerland/await');

/**
 * @constant awaitEventName
 * @type {String}
 */
export const awaitEventName = 'switzerland/resolved';

/**
 * @method children
 * @param {Object} props
 * @return {Promise}
 */
export const children = props => {

    const waitFor = new Map();
    const { node } = props;
    const boundary = node.shadowRoot;

    return awaitKey in props ? new Promise(resolve => {

        /**
         * @method resolved
         * @param {Object} event
         * @return {void}
         */
        function resolved(event) {

            // Resolve the current node if we have it in the map.
            waitFor.has(event.detail) && waitFor.set(event.detail, true);

            // Determine whether all awaiting nodes have been resolved, and if so then we'll
            // resolve the current node.
            Array.from(waitFor.values()).every(resolved => resolved === true) && done(node);

        }

        /**
         * @method done
         * @param {HTMLElement} node
         * @return {void}
         */
        function done(node) {

            // Tree has been resolved.
            node.removeEventListener(awaitEventName, resolved);
            resolve(waitFor);
            props.node.classList.add('resolved');

        }

        node.addEventListener(awaitEventName, resolved);

        // Place all of the nodes we're awaiting into the map.
        const nodeNames = props[awaitKey].join(',');

        // Attempt to find any matching nodes and await their resolution.
        const nodes = nodeNames.length && boundary.querySelectorAll(nodeNames);
        Array.from(nodes).forEach(awaitNode => waitFor.set(awaitNode, false));

        // If we were unable to find any of the `await` nodes then we'll simply resolve.
        !nodes.length && done(node);

    }) : Promise.resolve() && props.node.classList.add('resolved');

};

/**
 * @method resolved
 * @param {HTMLElement} node
 * @return {Promise}
 */
export const resolved = node => {

    return 'resolved' in node ? node.resolved : new Promise(resolve => {

        node.addEventListener(awaitEventName, function resolved(event) {

            if (event.detail === node) {
                node.removeEventListener(awaitEventName, resolved);
                node.resolved.then(() => resolve(node));
            }

        });

    });

};

/**
 * @param {Function|Array} nodeNames
 * @return {Function}
 */
export default (...nodeNames) => {

    return props => {

        // Retrieve the node names to wait for before resolving, and flatten the array if necessary.
        const nodes = typeof nodeNames[0] === 'function' ? nodeNames[0](props) : nodeNames;
        const flattenedNodes = Array.isArray(nodes[0]) ? nodes[0] : Array.isArray(nodes) ? nodes : [nodes];
        return { ...props, [awaitKey]: flattenedNodes };

    };

};
