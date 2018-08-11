// import * as u from './utils';

/**
 * @function create ∷ Props p ⇒ String → [(p → Promise p)]
 * ---
 * Takes the name of the web component and an array of functions that represent the
 * middleware. Each middleware item takes in the accumulated props, and yields props
 * to pass to the next item in the list.
 */
export function create(name, ...middleware) {
    customElements.define(
        name,
        class extends HTMLElement {
            /**
             * @method connectedCallback ∷ Promise void
             */
            connectedCallback() {
                return this.render();
            }

            /**
             * @method disconnectedCallback ∷ Promise void
             */
            disconnectedCallback() {
                this.classList.remove('resolved');
                return this.render();
            }

            /**
             * @method render ∷ ∀ a. Object String a → Promise void
             */
            render(mergeProps = {}) {
                const initialProps = {
                    ...mergeProps,
                    node: this,
                    render: this.render.bind(this)
                };

                return middleware.reduce((props, f) => {
                    return { ...props, ...f(props) };
                }, initialProps);
            }
        }
    );
}
