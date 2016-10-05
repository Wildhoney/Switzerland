import { memoize } from 'ramda';
import { registryKey, error } from '../switzerland';

/**
 * @method registerFor
 * @param {Array} methods
 * @param {Object} props
 * @return {void}
 */
const registerFor = memoize((nodeName, node, methods) => {

    Object.keys(methods).forEach(name => {

        const fn = methods[name];

        Object.getPrototypeOf(node)[name] = function(...args) {

            if (!(registryKey in this)) {
                error('You have passed an invalid context when invoking the node method');
                return;
            }

            // Gather the props that caused the last render of the component.
            const { props: lastProps } = this[registryKey];
            fn.call(this, { ...lastProps, args });

        };

    });

});

/**
 * @param {Object} methods
 * @return {Function}
 */
export default methods => {

    return props => {
        registerFor(props.node.nodeName, props.node, methods);
        return props;
    };

};
