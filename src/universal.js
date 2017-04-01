import createElement from 'virtual-dom/create-element';
import { defaultProps } from './switzerland';
import { coreKey } from './helpers/keys';

/**
 * @method render
 * @param {Object} component
 * @param {Object} [props = {}]
 * @return {String}
 */
export const render = async (component, props = {}) => {

    const node = {};
    const render = () => {};
    const attached = true;
    const result = await component({ node, render, attached, [coreKey]: defaultProps(), ...props, universal: true });

    return createElement(result[coreKey].tree).toString();

};
