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
    const [tag, constuctor, extend] = utils.parseTagName(name);

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
 * @function init
 * ---
 * Utility function for referencing paths inside of your custom components. Allows you to encapsulate
 * the components by using the `import.meta.url` (or `document.currentScript` for non-module includes).
 * Detects when the component is being used on a different host where absolute paths will be used instead
 * of relative ones to allow components to be rendered cross-domain.
 */
export function init(componentUrl) {
    return (resourcePath) => {
        return new URL(resourcePath, componentUrl).href;
    };
}

/**
 * @function render
 * ---
 * Takes the component tree and renders it to string for server-side rendering capabilities.
 */
export async function render(app, props = {}, options = { path: 'https://0.0.0.0/' }) {
    // Set the server-side options such as the server's URL.
    Object.entries(options).forEach(([key, value]) => serverOptions.set(key, value));

    const node = await app.render(props);
    return node.outerHTML;
}
