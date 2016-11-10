import { lastPropsKey } from '../switzerland';
import { error } from '../helpers/messages';

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

            if (!(lastPropsKey in this)) {
                error(`You have passed an invalid context when invoking the "${name}" method`);
                return;
            }

            // Gather the props that caused the last render of the component, and then invoke
            // the prototype function.
            fn({ ...this[lastPropsKey], args });

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
        const hasNode = registered.has(node.nodeName);
        !hasNode && setPrototypeFor(node, fns);

        return props;

    };

};
