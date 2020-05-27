import * as utils from './utils.js';
import createQueue from './queue/index.js';
import { getWindow } from '../../utils.js';

export function base(extension, middleware) {
    const queue = createQueue();

    return class Switzerland extends extension {
        constructor() {
            super();
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
            const task = new Promise(async (resolve) => {
                // Await the completion of the task last added to the stack.
                const currentTask = queue.current();
                await currentTask;

                // Iterate and invoke each middleware for this Swiss component.
                await utils.cycleMiddleware(this, props, middleware);

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
        const node = getWindow().document.createElement(this.name);
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
