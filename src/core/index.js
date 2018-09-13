import * as u from './utils.js';

export const handlers = new WeakMap();
export const previous = new WeakMap();
export const state = Symbol('@switzerland/state');
const queue = Symbol('@switzerland/queue');

/**
 * @function init ∷ String → String
 */
export const init = url => path => new URL(path, url).pathname;

/**
 * @function create ∷ Props p ⇒ String → [(p → Promise p)] → String
 * ---
 * Takes the name of the web component and an array of functions that represent the middleware. Each
 * middleware item takes in the accumulated props, and yields props to pass to the next item in the list.
 */
export const create = (name, ...middleware) => {
    const parts = name.split('/');
    const [tag, Prototype] = [
        u.resolveTagName(parts[0]),
        u.getPrototype(parts[1])
    ];

    window.customElements.define(
        tag,
        class extends Prototype {
            constructor() {
                super();
                this[queue] = new Set();
                this[state] = 'normal';
            }

            /**
             * @method connectedCallback ∷ Props p ⇒ p
             */
            connectedCallback() {
                return this.render();
            }

            /**
             * @method disconnectedCallback ∷ Props p ⇒ p
             */
            disconnectedCallback() {
                this.classList.remove('resolved');
                return this.render();
            }

            /**
             * @method render ∷ ∀ a. Props p ⇒ Object String a → p
             */
            async render(mergeProps = {}) {
                if (this[state] === 'error') {
                    // Cannot process new render cycles until the error has been resolved.
                    return;
                }

                const scheduledTask = new Promise(async resolve => {
                    // Await the completion of the task last added to the stack.
                    const tasks = Array.from(this[queue]);
                    const prevScheduledTask = tasks[tasks.length - 1];
                    await prevScheduledTask;

                    const dispatchEvent = u.dispatchEvent(this);
                    const initialProps = u.getInitialProps(
                        this,
                        mergeProps,
                        scheduledTask
                    );

                    if (
                        prevScheduledTask &&
                        !this[queue].has(prevScheduledTask)
                    ) {
                        // If a caught error has removed it from the queue, then we don't go any further.
                        resolve();
                        return;
                    }

                    try {
                        // Cycle through all of the middleware functions, updating the props as we go.
                        return await u.processMiddleware(
                            this,
                            initialProps,
                            middleware
                        );
                    } catch (error) {
                        // Errors should cancel any enqueued middleware.
                        this[queue].clear();
                        this[state] = 'error';

                        // Handle any errors that were thrown from the processing of the middleware functions.
                        return u.handleError(this, error);
                    } finally {
                        // Await the resolution of all the CSS import rules.
                        const stylesheets = u
                            .createShadowRoot(this)
                            .querySelectorAll('style');
                        await u.hasLoadedCSSImports(stylesheets);

                        // Always dispatch the "resolved" event regardless of success or failure. We also apply
                        // the "resolved" class name to the element.
                        dispatchEvent(u.getEventName('resolved'), {
                            node: this
                        });
                        this.isConnected && this.classList.add('resolved');
                        this[queue].delete(prevScheduledTask);
                        resolve();
                    }
                });

                // Add task to the queue.
                this[queue].add(scheduledTask);
                return scheduledTask;
            }
        }
    );

    return tag;
};

/**
 * @function alias ∷ String → String → String
 */
export const alias = (name, newName) => {
    const Constructor = window.customElements.get(name);
    const instance = new Constructor();
    const parts = newName.split('/');
    const Prototype = u.getPrototype(parts[1]);

    window.customElements.define(
        newName,
        class extends Prototype {
            constructor() {
                super();
                this[queue] = new Set();
                this[state] = 'normal';
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
        }
    );

    return newName;
};
