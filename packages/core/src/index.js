import * as u from './utils';

/**
 * @function create ∷ Props p ⇒ String → [(p → Promise p)]
 * ---
 * Takes the name of the web component and an array of functions that represent the middleware. Each
 * middleware item takes in the accumulated props, and yields props to pass to the next item in the list.
 */
export function create(name, ...middleware) {

    const [tag, extend] = name.split('/');
    const prototype = u.getPrototype(extend);

    customElements.define(
        tag,
        class extends prototype {
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
                    render: this.render.bind(this)
                };

                const props = await middleware.reduce(async (props, f) => {
                    return { ...props, ...(await f(props)) };
                }, initialProps);

                u.dispatchEvent(u.getEventName('resolved'), { node: this });
                this.classList.add('resolve');
                return props;
            }
        }
    );
}
