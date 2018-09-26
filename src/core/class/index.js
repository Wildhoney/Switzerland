import * as u from '../utils.js';
import createState from '../state/index.js';
import createQueue from '../queue/index.js';

export const meta = Symbol('meta');

export class CancelError extends Error {}

/**
 * @function createDefault ∷ Props p ⇒ HTMLElement → [(p → Promise p)] → Class
 */
export const createDefault = (extendsElement, middleware) =>
    class extends extendsElement {
        constructor() {
            super();
            this[meta] = {
                queue: createQueue(),
                state: createState(this)
            };
        }
        connectedCallback() {
            return this.render();
        }
        disconnectedCallback() {
            this.classList.remove('resolved');
            return this.render();
        }
        async render(mergeProps = {}) {
            if (this[meta].state.isError()) {
                // Cannot process new render cycles until the error has been resolved.
                return;
            }

            const { queue, state } = this[meta];

            const newTask = new Promise(async resolve => {
                // Await the completion of the task last added to the stack.
                const currentTask = queue.current();
                await currentTask;

                if (this[meta].queue.isInvalid(newTask)) {
                    // If a caught error has removed it from the queue, then we don't go any further.
                    return void resolve();
                }

                try {
                    // Cycle through all of the middleware functions, updating the props as we go.
                    const props = u.getInitialProps(this, mergeProps, currentTask);
                    return void (await u.handleMiddleware(this, props, middleware));
                } catch (error) {
                    if (error instanceof CancelError) {
                        return;
                    }

                    // Errors should cancel any enqueued middleware.
                    queue.dropAll();
                    state.setError();

                    // Handle any errors that were thrown from the processing of the middleware functions.
                    return void (queue.dropAll(), state.setError(), u.handleError(this, error));
                } finally {
                    // Await the resolution of all the CSS import rules.
                    await u.fetchedCSSImports(this);

                    // Always dispatch the "resolved" event regardless of success or failure. We also apply
                    // the "resolved" class name to the element.
                    const dispatchEvent = u.dispatchEvent(this);
                    dispatchEvent(u.getEventName('resolved'), {
                        node: this
                    });
                    this.isConnected && this.classList.add('resolved');
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
 * @function createAlias ∷ Props p ⇒ HTMLElement → Class → Class
 */
export const createAlias = (extendsElement, instance) =>
    class extends extendsElement {
        constructor() {
            super();
            this[meta] = {
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
