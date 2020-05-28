import * as utils from './utils.js';
import createQueue from './queue/index.js';
import createState from './state/index.js';
import { getWindow } from '../../utils.js';

export function base(extension, middleware) {
    const meta = Symbol('switzerland/meta');

    return class Swiss extends extension {
        constructor() {
            super();

            this[meta] = {
                queue: createQueue(),
                state: createState(this),
            };
        }

        connectedCallback() {
            this.setAttribute('data-swiss', '');
            return this.render({ lifecycle: 'mount' });
        }

        disconnectedCallback() {
            this.removeAttribute('data-swiss', '');
            this.classList.remove('resolved');
            return this.render({ lifecycle: 'unmount' });
        }

        render(props = {}) {
            const { queue, state } = this[meta];
            state.setNormal();

            const task = new Promise(async (resolve) => {
                // Await the completion of the task last added to the stack.
                const currentTask = queue.current();
                await currentTask;

                try {
                    // Iterate and invoke each middleware for this Swiss component.
                    await utils.cycleMiddleware(this, props, middleware);
                } catch (error) {
                    // Clear the queue and resolve as a middleware threw an error, and also
                    // mark the component as having errored.
                    queue.dropAll();
                    state.setError();
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
    }

    async render(props = {}) {
        // Setup the node with the `data-swiss` attribute for tracking the component's boundary, and
        // if it's extending an ative element, append the "is" attribute too.
        const node = getWindow().document.createElement(
            this.name,
            this.extend && { is: this.extend }
        );
        if (this.extend) node.setAttribute('is', this.extend);
        node.setAttribute('data-swiss', '');

        // Don't render at this point if it's not being server rendered, as the `connectedCallback`
        // of the `customElements` constructor will initiate the rendering process upon mount.
        if (typeof window !== 'undefined') return node;

        await utils.cycleMiddleware(node, { server: true, attrs: props }, this.middleware);
        return node;
    }
}

export function server(tag, middleware, extend = null) {
    return new Swiss(tag, middleware, extend);
}
