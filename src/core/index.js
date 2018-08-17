import * as u from './utils.js';
import m from '../middleware/index.js';
import { h } from '../middleware/html/index.js';
import { handler } from '../middleware/rescue/index.js';

const handlers = new WeakMap();
const previous = new WeakMap();

export { m, h };

/**
 * @constant queue ∷ Symbol
 */
const queue = Symbol('@switzerland/queue');

/**
 * @function init ∷ View v, String s ⇒ Object s s → Object { path: s → s, stylesheet: (s → s) → s → v }
 * ---
 * Initialisation function that takes the meta data of the component file (usually via `import.meta`) and
 * returns a set of useful functions that require knowledge of the source URL for relative path resolution.
 */
export const init = ({ url }) => {
    /**
     * @function path ∷ String → String
     */
    const getPath = path => new URL(path, url).href;

    return { path: getPath, stylesheet: u.getStylesheet(getPath) };
};

/**
 * @function create ∷ Props p ⇒ String → [(p → Promise p)]
 * ---
 * Takes the name of the web component and an array of functions that represent the middleware. Each
 * middleware item takes in the accumulated props, and yields props to pass to the next item in the list.
 */
export function create(name, ...middleware) {
    const parts = name.split('/');
    const [tag, prototype] = [
        u.resolveTagName(parts[0]),
        u.getPrototype(parts[1])
    ];

    customElements.define(
        tag,
        class extends prototype {
            /**
             * @constant ∷ Symbol
             */
            [queue] = new Set();

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
                const scheduledTask = new Promise(async resolve => {
                    // Await the completion of the task last added to the stack.
                    const tasks = Array.from(this[queue]);
                    const prevScheduledTask = tasks[tasks.length - 1];
                    await prevScheduledTask;

                    const prevProps = previous.get(this);
                    const dispatchEvent = u.dispatchEvent(this);
                    const isResolved = async () => {
                        const resolution = await Promise.race([
                            scheduledTask,
                            Promise.resolve(false)
                        ]);
                        return resolution !== false;
                    };

                    const initialProps = {
                        ...(prevProps || {}),
                        ...mergeProps,
                        isResolved,
                        node: this,
                        render: this.render.bind(this),
                        dispatch: dispatchEvent,
                        prevProps: previous.get(this) || null
                    };

                    if (
                        prevScheduledTask &&
                        !this[queue].has(prevScheduledTask)
                    ) {
                        // If a caught error has removed it from the queue, then we don't go any further.
                        resolve();
                        return;
                    }

                    try {
                        const props = await middleware.reduce(
                            async (accumP, middleware) => {
                                const props = await accumP;
                                const newProps = middleware({
                                    ...props,
                                    props
                                });

                                // Determine if there's an error handler in the current set of props. If there is then
                                // set the handler function as the default to be used if an error is subsequently thrown.
                                handler in newProps &&
                                    handlers.set(this, newProps);
                                return newProps;
                            },
                            initialProps
                        );

                        previous.set(this, props);
                        return props;
                    } catch (error) {
                        // Attempt to find an error handler for the current node which can handle the error gracefully.
                        // Otherwise a simple yet abrasive `console.error` will be used with no recovery possible.
                        const props = handlers.get(this);

                        if (!props) {
                            console.error(error);
                            return;
                        }

                        previous.set(this, { ...props, error });
                        props[handler]({ ...props, error });
                    } finally {
                        // Finally dispatch the event for parent components to be able to resolve, and add
                        // the "resolved" class to the element.
                        dispatchEvent(u.getEventName('resolved'), {
                            node: this
                        });
                        this.isConnected && this.classList.add('resolved');

                        // Task has been completed successfully.
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
}
