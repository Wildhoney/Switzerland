import * as utils from './utils.js';
import createQueue from './queue/index.js';
import createState from './state/index.js';
import { getWindow } from '../../utils.js';
import { getEventName, fromCamelcase } from '../utils.js';

/**
 * @function client
 * ---
 * Takes the element to extend and the view function for instantiating the
 * custom element ready to be rendered to the DOM.
 */
export function client(extension, view) {
    const meta = Symbol('switzerland/meta');

    return class Swiss extends extension {
        constructor() {
            super();

            this[meta] = {
                queue: createQueue(),
                state: createState(this),
            };

            this.utils = utils;
        }

        connectedCallback() {
            this.setAttribute('data-swiss', '');
            return this.render({ lifecycle: 'mount' });
        }

        disconnectedCallback() {
            this.removeAttribute('data-swiss');
            return this.render({ lifecycle: 'unmount' });
        }

        render(props = {}) {
            const node = this;
            const { queue, state } = this[meta];
            state.setNormal();

            const task = new Promise(async (resolve) => {
                // Await the completion of the task last added to the stack.
                const currentTask = queue.current();
                await currentTask;

                try {
                    // Iterate and invoke each middleware for this Swiss component.
                    await this.utils.runComponent(this, props, view);
                } catch (error) {
                    // Clear the queue and resolve as a middleware threw an error, and also
                    // mark the component as having errored.
                    queue.dropAll();
                    state.setError();
                } finally {
                    // Always dispatch the "resolved" event regardless of success or failure. We also apply
                    // the "resolved" class name to the element.
                    const dispatchEvent = this.utils.dispatchEvent(node);
                    dispatchEvent(getEventName('resolved'), { node });
                    queue.drop(task);
                    resolve();
                }

                resolve();
            });

            // Add task to the queue for processing.
            queue.push(task);
            return task;
        }
    };
}

export class Swiss {
    constructor(name, view, extend) {
        this.name = name;
        this.view = view;
        this.extend = extend;
        this.utils = utils;
    }

    async render(props = {}, options = {}) {
        // Setup the node with the `data-swiss` attribute for tracking the component's boundary, and
        // if it's extending an ative element, append the "is" attribute too.
        const node = (await getWindow()).document.createElement(this.name, this.extend && { is: this.extend });
        node.setAttribute('data-swiss', '');
        if (this.extend) node.setAttribute('is', this.extend);

        // Don't render at this point if it's not being server rendered, as the `connectedCallback`
        // of the `customElements` constructor will initiate the rendering process upon mount.
        if (typeof window !== 'undefined') return node;

        // Apply all of the attributes to the host node.
        for (const [key, value] of Object.entries(props)) node.setAttribute(fromCamelcase(key).toKebab(), value);

        // Write the opening of the current Swiss element to the stream's buffer if required.
        options.stream && options.stream.write(node.outerHTML.replace(`<${this.name}>`, ''));

        // Iterate over the middleware and then return the node.
        await this.utils.runComponent(node, { server: true, lifecycle: 'mount' }, this.view, options);

        // Once rendered we'll write the Swiss component's closing node to the stream.
        options.stream && options.stream.write(`</${this.name}>`);

        return node;
    }
}

/**
 * @function server
 * ---
 * Yields a Swiss component for rendering server-side, taking the tag name, view function, as well
 * as optionally the element it extends.
 */
export function server(tag, view, extend = null) {
    return new Swiss(tag, view, extend);
}
