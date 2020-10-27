import { getWindow } from '../utils.js';
import * as impl from './impl/index.js';
import * as utils from './utils.js';

/**
 * @function create
 * ---
 * Takes the name of the web component and an array of functions that represent the middleware. Each
 * middleware item takes in the accumulated props, and yields props to pass to the next item in the list.
 */
export function create(name, view = utils.getDefaultView) {
    const [tag, constuctor, extend] = utils.parseName(name);

    try {
        window.customElements.define(
            window.customElements.get(tag) ? utils.getRandomName() : tag,
            impl.client(constuctor, view),
            extend && { extends: extend }
        );
    } finally {
        return impl.server(extend ?? tag, view, extend ? tag : null);
    }
}

/**
 * @function render
 * ---
 * Takes the component tree and renders it to string for server-side rendering capabilities.
 */
export async function render(appOrHTML, propsOrComponentMap, options = utils.getDefaultOptions()) {
    const mergedOptions = { ...utils.getDefaultOptions(), ...options };

    const getStreamOptions = async () => {
        const { Transform } = await import('stream');
        const stream = new Transform();

        // Push chunks of data into our stream.
        stream._transform = function _transform(chunk, _, done) {
            return this.push(chunk), done();
        };

        return { ...mergedOptions, stream };
    };

    if (typeof appOrHTML === 'string') {
        return options.stream
            ? utils.toStreamFromHTML(appOrHTML, propsOrComponentMap, await getStreamOptions())
            : utils.toStringFromHTML(appOrHTML, propsOrComponentMap, mergedOptions);
    }

    if (appOrHTML instanceof impl.Swiss) {
        return options.stream
            ? utils.toStreamFromComponent(appOrHTML, propsOrComponentMap, await getStreamOptions())
            : utils.toStringFromComponent(appOrHTML, propsOrComponentMap, mergedOptions);
    }

    return null;
}

/**
 * @function preload
 * ---
 * Collates the assets for server-side rendering so that the qualifying nodes can be placed in the head of the
 * document to preload which helps to prevent FOUC.
 */
export async function preload(...trees) {
    const window = await getWindow();

    const links = trees
        .flatMap((tree) => tree.match(/<link.+?>/gis))
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

/**
 * @function rename
 * ---
 * Allows for the renaming of components, especially if a component has a duplicate name of another. In that case
 * Switzerland will assign a random name to the component, and it's up to the developer to rename it accordingly.
 */
export function rename(component, name) {
    const { view } = component;
    return create(name, view);
}

/**
 * @function fetch
 * ---
 * Utility function for unwrapping the `default` export from an asynchronous import, which allows for fetching of
 * components only when they're needed in the current tree.
 */
export async function fetch(importer) {
    return (await importer).default;
}
