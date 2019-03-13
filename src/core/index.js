import * as u from './utils.js';
import * as impl from './impl/index.js';

export { meta, Cancel } from './utils.js';

/**
 * @function init ∷ String → String → (String → String)
 * ---
 * Utility function for referencing paths inside of your custom components. Allows you to encapsulate
 * the components by using the `import.meta.url` (or `document.currentScript` for non-module includes).
 * Detects when the component is being used on a different host where absolute paths will be used instead
 * of relative ones to allow components to be rendered cross-domain.
 */
export const init = (url, host = window.location.host) => path => {
    const a = document.createElement('a');
    a.href = url;
    const key = a.host === host ? 'pathname' : 'href';
    return new URL(path, url)[key];
};

/**
 * @function create ∷ Props p ⇒ String → [(p → Promise p)] → String
 * ---
 * Takes the name of the web component and an array of functions that represent the middleware. Each
 * middleware item takes in the accumulated props, and yields props to pass to the next item in the list.
 */
export const create = (name, ...middleware) => {
    const [tag, extension, tagExtend] = u.parseTagName(name);
    window.customElements.define(
        tag,
        impl.base(extension, middleware),
        tagExtend && { extends: tagExtend }
    );
    return tag;
};

/**
 * @function alias ∷ String → String → String
 * ---
 * Takes the name of an existing custom element, and creates a clone of it under a different name. No attempt
 * to find a unique name takes place in this function, and so if the new custom component name already exists, a
 * native ungraceful `customElements` exception will be thrown.
 */
export const alias = (name, newName) => {
    const CustomElement = window.customElements.get(name);
    const instance = new CustomElement();
    const [, extension] = u.parseTagName(newName);
    window.customElements.define(newName, impl.alias(extension, instance));
    return newName;
};
