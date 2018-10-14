import * as u from './utils.js';
import * as c from './class/index.js';

export { meta, CancelError } from './class/index.js';

/**
 * @function init ∷ String → String → (String → String)
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
    const [tag, extendsElement] = u.parseTagName(name);
    window.customElements.define(
        tag,
        c.createDefault(extendsElement, middleware)
    );
    return tag;
};

/**
 * @function alias ∷ String → String → String
 */
export const alias = (name, newName) => {
    const CustomElement = window.customElements.get(name);
    const instance = new CustomElement();
    const [, extendsElement] = u.parseTagName(newName);
    window.customElements.define(
        newName,
        c.createAlias(extendsElement, instance)
    );
    return newName;
};
