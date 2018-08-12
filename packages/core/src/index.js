import { handler } from '@switzerland/rescue';
import * as u from './utils';

export { u };

const handlers = new WeakMap();
const previous = new WeakMap();

/**
 * @function create ∷ Props p ⇒ String → [(p → Promise p)]
 * ---
 * Takes the name of the web component and an array of functions that represent the middleware. Each
 * middleware item takes in the accumulated props, and yields props to pass to the next item in the list.
 */
export function create(name, ...middleware) {
    const [tag] = name.split('/');

    customElements.define(
        tag,
        class extends HTMLElement {
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
                const initialProps = {
                    ...mergeProps,
                    node: this,
                    render: this.render.bind(this),
                    prevProps: previous.get(this) || null
                };

                try {
                    const props = await middleware.reduce(
                        async (accumP, middleware) => {
                            const props = middleware(await accumP);

                            // Determine if there's an error handler in the current set of props. If there is then
                            // set the handler function as the default to be used if an error is subsequently thrown.
                            handler in props && handlers.set(this, props);
                            return props;
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
                    u.dispatchEvent(u.getEventName('resolved'), { node: this });
                    this.classList.add('resolved');
                }
            }
        }
    );
}
