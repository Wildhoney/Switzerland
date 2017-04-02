import createElement from 'virtual-dom/create-element';
import inlineCss from 'inline-css';
import identity from 'ramda/src/identity';
import { defaultProps, elementMap } from './switzerland';
import { coreKey } from './helpers/keys';

/**
 * @method render
 * @param {String} name
 * @param {Object} [props = {}]
 * @param {Object} [options = {}]
 * @return {String}
 */
export const render = async (name, props = {}, options) => {

    const component = elementMap.get(name);

    const result = await component({
        node: {},
        render: identity,
        attached: true,
        [coreKey]: { ...defaultProps(), base: options.url },
        ...props,
        universal: true
    });

    const { tree, css = '' } = result[coreKey];
    const element = createElement(tree);

    return await inlineCss(`<style type="text/css">${css}</style>${element.toString()}`, {
        url: options.url
    });

};
