import browserEnv from 'browser-env';
import * as u from '../core/utils.js';
import { initialProps } from './utils.js';

browserEnv(['window', 'document', 'navigator']);

export async function render([name, middleware], attrs = {}) {
    const node = document.createElement(name);
    const props = initialProps(node, middleware);

    Object.entries(attrs).forEach(([name, value]) => {
        node.setAttribute(name, value);
    });

    await u.cycleMiddleware(node, props, middleware);
    node.classList.add('resolved');

    return node.outerHTML;
}
