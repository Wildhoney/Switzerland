/**
 * @function getPath ∷ String → (void → String) → Window → (String → String)
 */
export const getPath = (componentUrl, rootPath, window) => resourcePath => {
    if (typeof require === 'undefined') {
        return new URL(resourcePath, componentUrl).href;
    }

    const componentPath = new URL(componentUrl).pathname;
    const relativePath = require('path').relative(rootPath(), componentPath);
    const urlPath = new URL(relativePath, window.location.href);
    return new URL(resourcePath, urlPath).href;
};
