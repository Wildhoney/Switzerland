import { prevPropsKey } from '../switzerland';
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

            if (!(prevPropsKey in this)) {
                error(`You have passed an invalid context when invoking the "${name}" method`);
                return;
            }

            const prevProps = this[prevPropsKey];

            // Gather the props that caused the last render of the component, and then invoke
            // the prototype function. If only one argument has been passed, then we'll also define
            // the `arg` variable to make it more grammatically correct.
            args.length === 1 ? fn({ ...prevProps, args, arg: args[0] }) : fn({ ...prevProps, args });

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
