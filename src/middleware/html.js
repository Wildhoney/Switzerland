import { htmlKey } from '../switzerland';

/**
 * @param {Function} html
 * @return {Function}
 */
export default html => {

    return props => {
        return { ...props, [htmlKey]: html(props) };
    };

};
