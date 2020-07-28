/**
 * @function getPath
 * ---
 * Utility function for referencing paths inside of your custom components. Allows you to encapsulate
 * the components by using the `import.meta.url` (or `document.currentScript` for non-module includes).
 * Detects when the component is being used on a different host where absolute paths will be used instead
 * of relative ones to allow components to be rendered cross-domain.
 */
export function getPath(componentUrl) {
    return (resourcePath) => {
        return new URL(resourcePath, componentUrl).href;
    };
}
