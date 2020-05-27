import * as impl from './impl/index.js';
import * as utils from './utils.js';

/**
 * @function create
 * ---
 * Takes the name of the web component and an array of functions that represent the middleware. Each
 * middleware item takes in the accumulated props, and yields props to pass to the next item in the list.
 */
export function create(name, ...middleware) {
    const [tag, constuctor, extend] = utils.parseTagName(name);

    window.customElements.define(
        tag,
        impl.base(constuctor, middleware),
        extend && { extends: extend }
    );

    return impl.server(extend ?? tag, middleware, extend ? tag : null);
}

/**
 * @function init
 * ---
 * Utility function for referencing paths inside of your custom components. Allows you to encapsulate
 * the components by using the `import.meta.url` (or `document.currentScript` for non-module includes).
 * Detects when the component is being used on a different host where absolute paths will be used instead
 * of relative ones to allow components to be rendered cross-domain.
 */
export function init(componentUrl, pathConfig) {
    return (resourcePath) => {
        if (typeof require === 'undefined' || !pathConfig || pathConfig.forceBrowser) {
            return new URL(resourcePath, componentUrl).href;
        }

        const componentPath = new URL(componentUrl).pathname;
        const path = require('path');
        const relativePath = path.relative(pathConfig.rootPath(path.resolve), componentPath);
        const urlPath = new URL(relativePath, pathConfig.url);
        return new URL(resourcePath, urlPath).href;
    };
}
