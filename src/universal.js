import createElement from 'virtual-dom/create-element';
import { jsdom } from 'jsdom';
import inlineCss from 'inline-css';
import identity from 'ramda/src/identity';
import { defaultProps, nodeMap } from './switzerland';
import { coreKey } from './helpers/keys';

/**
 * @method render
 * @param {String} name
 * @param {Object} [props = {}]
 * @return {String}
 */
export const render = async (name, props = {}) => {

    /**
     * @method mount
     * @param {String} name
     * @return {String}
     */
    const mount = async name => {

        const registeredNodes = Array.from(nodeMap.keys()).filter(nodeName => nodeName !== name);
        const component = nodeMap.get(name);

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
        // const html = `<style type="text/css">${css}</style><${name} class="resolved">${element.toString()}</${name}>`;
        const html = `<style type="text/css">${css}</style><${name}>${element.toString()}</${name}>`;
        const document = await inlineCss(html, {
            url: '/'
        }).then(html => jsdom(html));

        const children = Array.from(document.querySelectorAll(registeredNodes.join(',')));

        await Promise.all(children.map(async child => {
            child.innerHTML = await mount(child.nodeName.toLowerCase());
        }));

        return document.documentElement.outerHTML;

    };

    return await mount(name);

};
