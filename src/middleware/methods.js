import { registryKey, error } from '../switzerland';

/**
 * @constant registered
 * @type {Set}
 */
const registered = new Set();

/**
 * @method setPrototypeFor
 * @param {HTMLElement} node
 * @param {Array} fns
 * @return {void}
 */
const setPrototypeFor = (node, fns) => {

    registered.add(node.nodeName);

    Object.keys(fns).forEach(name => {

        const fn = fns[name];

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
 * @param {Object} fns
 * @return {Function}
 */
export default fns => {

    return props => {

        const { node } = props;
        const has = registered.has(node.nodeName);
        !has && setPrototypeFor(node, fns);

        return props;

    };

};
