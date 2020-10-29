import { getWindow, replaceTemplate } from '../utils.js';
import { createVNode as h } from './renderer/utils.js';
import * as utils from './utils.js';

export { getAttributes } from '../adapters/attributes/utils.js';

/**
 * @function toStringFromComponent
 * ---
 * Takes a component as the starting point
 */
export async function toStringFromComponent(app, props = {}, options = {}) {
    // Render the app using the passed props.
    const node = await app.render(props, options);

    // JSDOM has an issue with appending children to the `template` node, so we merely find and replace
    // at this point to mimick the behaviour.
    return replaceTemplate(node.outerHTML);
}

/**
 * @function toStreamFromHTML
 * ---
 *
 */
export async function toStreamFromHTML(html, componentMap = new Map(), options = {}) {
    async function run() {
        // Invoke the typical `render` function but with an attached stream, and end the stream once
        // the full component tree has been rendered.
        await toStringFromHTML(html, componentMap, options);
        options.stream.end();
    }

    return run(), options.stream;
}

/**
 * @function toStringFromHTML
 * ---
 * Takes a HTML DOM tree and traverses over it to pull out the HTML nodes that need components rendering
 * inside of them. You must pass in a node to component mapping (instance of Map) via the second argument.
 */
export async function toStringFromHTML(html, componentMap = new Map(), options = {}) {
    const window = await getWindow();
    const doc = new window.DOMParser().parseFromString(html, 'text/html');
    const walker = window.document.createTreeWalker(doc.body);
    const cloned = window.document.createTreeWalker(new window.DOMParser().parseFromString(html, 'text/html'));
    const isStreaming = options.stream;

    async function walk() {
        // End the recursive walking of the DOM tree if there is no next node.
        if ((cloned.nextNode(), !walker.nextNode())) return null;

        // See if the current HTML node matches a component name from the passed in components.
        const name = walker.currentNode.tagName?.toLowerCase() ?? null;
        const app = componentMap.get(name);
        const attrs = utils.getAttributes(walker.currentNode?.attributes ?? {});

        // Write the opening of the node to the stream if it's available.
        if (isStreaming) {
            const node = window.document.createElement(name);
            Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
            options.stream.write(`${node.outerHTML.replace(`</${name}>`, '')}`);
        }

        if (app) {
            // Update the HTML from the rendering of the current component.
            const html = await toStringFromComponent(app, attrs, { ...options, stream: null });
            const doc = new window.DOMParser().parseFromString(html, 'text/html');
            cloned.currentNode.innerHTML = doc.body.firstChild.innerHTML;

            // Write the body of the component if a stream is available.
            isStreaming && options.stream.write(doc.body.firstChild.innerHTML);
        }

        await walk();

        // Close the node and write to the stream if required.
        isStreaming && options.stream.write(`</${name}>`);
    }

    return await walk(), cloned.root.innerHTML;
}

/**
 * @function toStreamFromComponent
 * ---
 * Renders the component tree as usual but yields a readable Node stream that can be piped to the response.
 */
export async function toStreamFromComponent(app, props = {}, options = {}) {
    async function run() {
        // Invoke the typical `render` function but with an attached stream, and end the stream once
        // the full component tree has been rendered.
        await toStringFromComponent(app, props, options);
        options.stream.end();
    }

    return run(), options.stream;
}

/**
 * @function getDefaultOptions
 * ---
 * Obtains the defaults used for server-side rendering.
 */
export function getDefaultOptions() {
    return { path: 'https://0.0.0.0/', root: '', stream: false };
}

/**
 * @function getDefaultView
 * ---
 * Default view if none has been specified when creating a component.
 */
export function getDefaultView({ node }) {
    return h('code', { style: 'font-family: monospace' }, `<${node.nodeName.toLowerCase()} />`);
}

/**
 * @function parsename
 * ---
 * Parse the node name, grab the prototype to extend if we're running on the client, and the element
 * it extends if we're extending from an existing native element. For example "x-example" would yield
 * the `HTMLElement` to extend, whereas "x-example/button" would extend from `HTMLButtonElement`.
 */
export function parseName(name) {
    const [tag, prototype] = name.split('/');
    const extend = prototype ?? null;
    return [tag, getPrototype(prototype), extend];
}

/**
 * @function
 * ---
 * Generates a temporary random name for a custom element due to their being a duplicate, which should
 * be later re-named using the `rename` function.
 */
export function getRandonName() {
    return `swiss-${Date.now()}-${Math.round(Math.random() * 100)}`;
}

/**
 * @function getPrototype
 * ---
 * Determine the prototype for any given element name, for example `div` would yield `HTMLElement`, and
 * `button` would yield `HTMLButtonElement`. If we're rendering server-side then this is useless and as
 * such we'll yield `null` in those cases.
 */
export function getPrototype(name) {
    if (typeof window === 'undefined') return null;
    return name ? window.document.createElement(name).constructor : window.HTMLElement;
}

/**
 * @function getDefaults
 * ---
 * Split the optional type parameter tuple into its distinct parts to determine the default values if none
 * is specified.
 */
export function getDefaults(types) {
    return Object.entries(types).reduce(
        (accum, [key, value]) =>
            Array.isArray(value) && typeof value[1] !== 'undefined' ? { ...accum, [key]: value[1] } : accum,
        {}
    );
}

/**
 * @function toCamelCase
 * ---
 * Utility function to transforming to camelcase from kebab and snake.
 */
export function toCamelcase(value) {
    const f = (separator) => () => {
        const r = new RegExp(`(${separator}\\w)`, 'g');
        return value.replace(r, (match) => match[1].toUpperCase());
    };
    return {
        fromKebab: f('-'),
        fromSnake: f('_'),
    };
}

/**
 * @function fromCamelcase
 * ---
 * Utility function to transforming from camelcase to kebab and snake.
 */
export function fromCamelcase(value) {
    const f = (separator) => () => {
        return value.replace(/([A-Z])/g, `${separator}$1`).toLowerCase();
    };
    return {
        toKebab: f('-'),
        toSnake: f('_'),
    };
}

/**
 * @function getEventName
 * ---
 * Simple utility function to get the specialised event name.
 */
export function getEventName(label) {
    return `@switzerland/${label}`;
}
