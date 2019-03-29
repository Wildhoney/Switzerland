import * as u from '../utils.js';
import createState from '../state/index.js';
import createQueue from '../queue/index.js';

/**
 * @function base ∷ Props p ⇒ HTMLElement → [(p → Promise p)] → Class
 * ---
 * The default implementation of the custom element class which contains all of the render logic. Render
 * passes occur consecutively and as such repeated calls to `render` will be enqueued for the same component.
 */
export const base = (extension, middleware) =>
    class Switzerland extends extension {
        constructor() {
            super();
            this[u.meta] = {
                queue: createQueue(),
                state: createState(this),
                boundary: null
            };
        }
        connectedCallback() {
            return this.render({ lifecycle: 'mount' });
        }
        disconnectedCallback() {
            this.classList.remove('resolved');
            return this.render({ lifecycle: 'unmount' });
        }
        idle() {
            return this[u.meta].queue.current();
        }
        render(mergeProps = {}) {
            const isRemounting = mergeProps.lifecycle === 'mount';
            const node = this;
            const { queue, state } = node[u.meta];

            if (state.isError() && !isRemounting) {
                // Cannot process new render cycles until the error has been resolved, unless
                // we're trying to re-mount the component.
                return;
            }

            const newTask = new Promise(async resolve => {
                // Await the completion of the task last added to the stack.
                const currentTask = queue.current();
                await currentTask;

                if (node[u.meta].queue.isInvalid(newTask)) {
                    // If a caught error has removed it from the queue, then we don't go any further.
                    return void resolve();
                }

                try {
                    // Cycle through all of the middleware functions, updating the props as we go.
                    const props = u.initialProps(
                        node,
                        middleware,
                        mergeProps,
                        currentTask
                    );

                    return await u.cycleMiddleware(node, props, middleware);
                } catch (error) {
                    if (error instanceof u.Cancel) {
                        return;
                    }

                    // Handle any errors that were thrown from the processing of the middleware functions.
                    // Errors should cancel any enqueued middleware.
                    return void (queue.dropAll(),
                    state.setError(),
                    u.handleException(node, error));
                } finally {
                    // Await the resolution of all the CSS import rules.
                    await u.cssImports(node);

                    // Always dispatch the "resolved" event regardless of success or failure. We also apply
                    // the "resolved" class name to the element.
                    const dispatchEvent = u.dispatchEvent(node);
                    dispatchEvent(u.getEventName('resolved'), {
                        node
                    });
                    node.isConnected && node.classList.add('resolved');
                    queue.drop(newTask);
                    resolve();
                }
            });

            // Add task to the queue.
            queue.push(newTask);
            return newTask;
        }
    };

/**
 * @function alias ∷ Props p ⇒ HTMLElement → Class → Class
 * ---
 * Alias class implementation which attempts to locate the existing custom component, and to then create an
 * alias of it under its new name. Delegates all responsibilities to the above `createDefault` yielded class.
 */
export const alias = (extension, instance) =>
    class Switzerland extends extension {
        constructor() {
            super();
            this[u.meta] = {
                queue: createQueue(),
                state: createState(this)
            };
        }
        connectedCallback() {
            return instance.connectedCallback.call(this);
        }
        disconnectedCallback() {
            return instance.disconnectedCallback.call(this);
        }
        render() {
            return instance.render.call(this);
        }
    };
