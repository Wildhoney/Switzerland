import browserEnv from 'browser-env';
import { elements } from '../core/index.js';
import * as u from '../core/utils.js';
import { initialProps } from './utils.js';

browserEnv(['window', 'document', 'navigator']);

export async function render([name, middleware], attrs = {}, node = document.createElement(name)) {
    // Attach any custom attributes to the host element.
    Object.entries(attrs).forEach(([name, value]) => node.setAttribute(name, value));

    // Cycle through the middleware and append the "resolved" class name.
    const props = initialProps(node, middleware);
    await u.cycleMiddleware(node, props, middleware);
    node.classList.add('resolved');

    // Render recursively each custom child element.
    for (const name of elements.keys()) {
        const childNode = node.querySelector(name);
        const middleware = elements.get(name);
        childNode && (await render([name, middleware], {}, childNode));
    }

    return node.outerHTML;
}
