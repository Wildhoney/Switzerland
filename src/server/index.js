import { elements } from '../core/index.js';
import * as u from './utils.js';

// Determine whether we're in headless mode or not.
const isHeadless = typeof window === 'undefined' && typeof document === 'undefined';

/**
 * @constant window ∷ Window
 */
const Window =
    isHeadless &&
    (() => {
        const { JSDOM } = require('jsdom');
        const dom = new JSDOM();
        return dom.window;
    })();

/**
 * @function render ∷ ∀ a. [String, [(p → p)]]|String → Object String a → HTMLElement → String
 */
export async function render(component, attrs = {}, node) {
    if (isHeadless) {
        // Define the JSDOM globals if the current environment doesn't have them.
        global.window = new Window();
        global.document = global.window.document;
    }

    // Either use the passed node or create from the passed name.
    const isComponent = Array.isArray(component);
    const host = isComponent
        ? await u.parseComponent(component, node, attrs)
        : u.parseHtml(component);

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

    return host[isComponent ? 'outerHTML' : 'innerHTML'];
}
