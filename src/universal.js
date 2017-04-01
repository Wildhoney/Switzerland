import createElement from 'virtual-dom/create-element';
import identity from 'ramda/src/identity';
import { defaultProps } from './switzerland';
import { coreKey } from './helpers/keys';

/**
 * @method render
 * @param {Object} component
 * @param {Object} [props = {}]
 * @return {String}
 */
export const render = async (component, props = {}) => {

    const result = await component({
        node: {},
        render: identity,
        attached: true,
        [coreKey]: defaultProps(),
        ...props,
        universal: true
    });

    const tree = createElement(result[coreKey].tree);
    return 'outerHTML' in tree ? tree.outerHTML : tree.toString();

};
