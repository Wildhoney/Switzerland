import { registryKey, error } from '../switzerland';

/**
 * @constant registered
 * @type {Set}
 */
const registered = new Set();

/**
 * @method setPrototypeFor
 * @param {HTMLElement} node
 * @param {Array} methods
 * @return {void}
 */
const setPrototypeFor = (node, methods) => {

    registered.add(node.nodeName);

    Object.keys(methods).forEach(name => {

        const fn = methods[name];

        Object.getPrototypeOf(node)[name] = function (...args) {

            if (!(registryKey in this)) {
                error('You have passed an invalid context when invoking the node method');
                return;
            }

            // Gather the props that caused the last render of the component, and then invoke
            // the prototype function.
            const { props: lastProps } = this[registryKey];
            fn({ ...lastProps, args });

        };

    });

};

/**
 * @param {Object} methods
 * @return {Function}
 */
export default methods => {

    return props => {

        const { node } = props;
        const has = registered.has(node.nodeName);
        !has && setPrototypeFor(node, methods);

        return props;

    };

};
