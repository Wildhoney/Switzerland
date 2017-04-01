import createElement from 'virtual-dom/create-element';
import inlineCss from 'inline-css';
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

    const { tree, css = '' } = result[coreKey];
    const element = createElement(tree);

    return await inlineCss(`<style type="text/css">${css}</style>${element.toString()}`, {
        url: 'http://localhost:5000/'
    });

};
