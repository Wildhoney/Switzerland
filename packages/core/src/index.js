import * as u from './utils';

export const create = (name, ...middleware) => {
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

                const x = middleware.reduce((props, f) => {
                    return { ...props, ...f(props) };
                }, initialProps);

                console.log(x);
            }
        }
    );
};
