import Window from 'window';
import { elements } from '../core/index.js';
import * as u from '../core/utils.js';
import { initialProps } from './utils.js';

/**
 * @constant window ∷ Window
 */
const window = new Window();

// Determine whether we're in headless mode or not.
const isHeadless = typeof window === 'undefined' && typeof document === 'undefined';

export async function render([name, middleware], attrs = {}, node) {
    if (isHeadless) {
        // Define the JSDOM globals if the current environment doesn't have them.
        global.window = window;
        global.document = window.document;
    }

    // Either use the passed node or create from the passed name.
    const host = node || document.createElement(name);

    // Attach any custom attributes to the host element.
    Object.entries(attrs).forEach(([name, value]) => host.setAttribute(name, value));

    // Cycle through the middleware and append the "resolved" class name.
    const props = initialProps(host, middleware);
    await u.cycleMiddleware(host, props, middleware);
    host.classList.add('resolved');

    // Render recursively each custom child element.
    for (const name of elements.keys()) {
        const childNode = host.querySelector(name);
        const middleware = elements.get(name);
        childNode && (await render([name, middleware], {}, childNode));
    }

    if (isHeadless) {
        // Clean up the defined globals.
        delete global.window;
        delete global.document;
    }

    return host.outerHTML;
}
