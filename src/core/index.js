import { getWindow } from '../utils.js';
import * as impl from './impl/index.js';
import * as utils from './utils.js';
import defaultController from './defaults/controller.js';
import defaultView from './defaults/view.js';

export const serverOptions = new Map();

/**
 * @function create
 * ---
 * Takes the name of the web component and an array of functions that represent the middleware. Each
 * middleware item takes in the accumulated props, and yields props to pass to the next item in the list.
 */
export function create(
    name,
    { controller = defaultController, view = defaultView } = { controller: defaultController, view: defaultView }
) {
    const [tag, constuctor, extend] = utils.parseName(name);

    try {
        window.customElements.define(tag, impl.base(constuctor, [controller, view]), extend && { extends: extend });
    } finally {
        return impl.server(extend ?? tag, [controller, view], extend ? tag : null);
    }
}

/**
 * @function render
 * ---
 * Takes the component tree and renders it to string for server-side rendering capabilities.
 */
export async function render(app, props = {}, options = { path: 'https://0.0.0.0/' }) {
    // Set the server-side options such as the server's URL.
    Object.entries(options).forEach(([key, value]) => serverOptions.set(key, value));

    // Initialise the window on initial render so that it doesn't need to yield a promise every
    // single time it's invoked, instead the return value is memoized.
    await getWindow();

    const node = await app.render(props);
    return node.outerHTML.replace(/x-template/g, 'template');
}

/**
 * @function preload
 * ---
 * Collates the assets for server-side rendering so that the qualifying nodes can be placed in
 * the head of the document to preload which helps to prevent FOUC.
 */
export async function preload(...output) {
    const window = getWindow();

    const links = output
        .flatMap((output) => output.match(/<link.+?>/gi))
        .map((link) => {
            if (!link) return;

            // Parse the link DOM string into a HTML node.
            const node = window.document.createElement('div');
            node.innerHTML = link;
            const child = node.firstChild;

            // Transform the link into a preload node for the head of the document.
            child.setAttribute('as', 'style');
            child.setAttribute('rel', 'preload');
            child.removeAttribute('key');
            child.removeAttribute('type');

            return child.outerHTML;
        });

    return links.join('\n');
}
