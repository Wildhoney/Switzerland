import { registryKey } from '../switzerland';
import once from './once';

/**
 * @method registerFor
 * @param {Array} methods
 * @param {Object} props
 * @return {void}
 */
const registerFor = (methods, props) => {

    const { node } = props;

    Object.keys(methods).forEach(name => {

        const fn = methods[name];

        node[name] = (...args) => {

            // Gather the props that caused the last render of the component.
            const { props: lastProps } = props.node[registryKey];
            fn.call(props.node, { ...lastProps, args });

        };

    });

};

/**
 * @param {Object} methods
 * @return {Function}
 */
export default methods => {

    return props => {
        once(registerFor.bind(null, methods))(props);
        return props;
    };

};
