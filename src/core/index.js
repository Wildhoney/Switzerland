import { getWindow } from '../utils.js';
import * as impl from './impl/index.js';
import * as utils from './utils.js';

export const serverOptions = new Map();

/**
 * @function create
 * ---
 * Takes the name of the web component and an array of functions that represent the middleware. Each
 * middleware item takes in the accumulated props, and yields props to pass to the next item in the list.
 */
export function create(name, ...middleware) {
    const [tag, constuctor, extend] = utils.parseName(name);

    try {
        window.customElements.define(
            tag,
            impl.base(constuctor, middleware),
            extend && { extends: extend }
        );
    } finally {
        return impl.server(extend ?? tag, middleware, extend ? tag : null);
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
 * @function styles
 * ---
 * Collates the styles for server-side rendering so that the applicable style tags can be placed in
 * the head of the document to prevent FOUC.
 */
export function styles(...output) {
    const styles = output.flatMap((output) => output.match(/<link.+?>/gi));
    return styles.join('\n');
}
