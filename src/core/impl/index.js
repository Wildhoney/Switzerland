import * as utils from './utils.js';
import createQueue from './queue/index.js';
import createState from './state/index.js';
import { getWindow } from '../../utils.js';
import { getEventName, fromCamelcase } from '../utils.js';
import { serverOptions } from '../index.js';

export function client(extension, middleware) {
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
                    await this.utils.runComponent(this, props, middleware);
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
    constructor(name, middleware, extend) {
        this.name = name;
        this.middleware = middleware;
        this.extend = extend;
        this.utils = utils;
    }

    async render(props = {}) {
        // Setup the node with the `data-swiss` attribute for tracking the component's boundary, and
        // if it's extending an ative element, append the "is" attribute too.
        const node = getWindow().document.createElement(this.name, this.extend && { is: this.extend });
        node.setAttribute('data-swiss', '');
        if (this.extend) node.setAttribute('is', this.extend);

        // Don't render at this point if it's not being server rendered, as the `connectedCallback`
        // of the `customElements` constructor will initiate the rendering process upon mount.
        if (typeof window !== 'undefined') return node;

        // Apply all of the attributes to the host node.
        for (const [key, value] of Object.entries(props)) node.setAttribute(fromCamelcase(key).toKebab(), value);

        // Iterate over the middleware and then return the node.
        await this.utils.runComponent(node, { server: true, lifecycle: 'mount' }, this.middleware);

        if (serverOptions.get('stream')) {
            // Write to the stream's buffer if required.
            const stream = serverOptions.get('stream');
            stream.write(node.outerHTML);
        }

        return node;
    }
}

export function server(tag, middleware, extend = null) {
    return new Swiss(tag, middleware, extend);
}
