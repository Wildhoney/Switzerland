import { getWindow, replaceTemplate } from '../utils.js';
import * as impl from './impl/index.js';
import * as utils from './utils.js';
import defaultController from './defaults/controller.js';
import defaultView from './defaults/view.js';

/**
 * @function create
 * ---
 * Takes the name of the web component and an array of functions that represent the middleware. Each
 * middleware item takes in the accumulated props, and yields props to pass to the next item in the list.
 */
export function create(name, { controller = defaultController, view = defaultView } = {}) {
    const [tag, constuctor, extend] = utils.parseName(name);

    try {
        window.customElements.define(tag, impl.client(constuctor, [controller, view]), extend && { extends: extend });
    } finally {
        return impl.server(extend ?? tag, [controller, view], extend ? tag : null);
    }
}

/**
 * @function render
 * ---
 * Takes the component tree and renders it to string for server-side rendering capabilities.
 */
export async function render(app, props = {}, options = { path: 'https://0.0.0.0/', root: '' }) {
    // Initialise the window on initial render so that it doesn't need to yield a promise every
    // single time it's invoked, instead the return value is memoized.
    await getWindow();

    // Render the app using the passed props.
    const node = await app.render(props, options);

    // JSDOM has an issue with appending children to the `template` node, so we merely find and replace
    // at this point to mimick the behaviour.
    return replaceTemplate(node.outerHTML);
}

/**
 * @function renderToStream
 * ---
 * Renders the component tree as usual but yields a readable Node stream that can be piped to the response.
 */
export async function renderToStream(app = {}, props, options = { path: 'https://0.0.0.0/', root: '' }) {
    const { Transform } = await import('stream');
    const stream = new Transform();

    // Push chunks of data into our stream.
    stream._transform = (chunk, _, done) => (this.push(chunk), done());

    async function run() {
        // Invoke the typical `render` function but with an attached stream, and end the stream once
        // the full component tree has been rendered.
        await render(app, props, { ...options, stream });
        stream.end();
    }

    return run(), stream;
}

/**
 * @function preload
 * ---
 * Collates the assets for server-side rendering so that the qualifying nodes can be placed in the head of the
 * document to preload which helps to prevent FOUC.
 */
export async function preload(...output) {
    const window = await getWindow();

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

/**
 * @function compose
 * ---
 * Allows the composition of controllers and views. In the case of controllers, the yielded objects are merged
 * together with duplicate props taking precendence in reverse order. In the case of views, the trees are taken
 * from left-to-right.
 */
export function compose(...fns) {
    return (props) => {
        const isViews = props.adapter == null;
        const newProps = fns.flatMap((fn) => fn(props));

        return isViews
            ? newProps
            : Object.values(newProps).reduce((accumProps, props) => ({ ...accumProps, ...props }), {});
    };
}
