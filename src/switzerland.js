import OrderlyQueue from 'orderly-queue';
export { h } from 'picodom';

/**
 * @constant meta
 * @type {Symbol}
 */
export const meta: Symbol = Symbol('meta');

/**
 * @method create
 * @param {String} name
 * @param {Array} middlewares
 * @return {Object}
 */
export function create(name: string, ...middlewares: Array<Function>): void {

    const queue: OrderlyQueue = new OrderlyQueue();

    customElements.define(name, class extends HTMLElement {

        /**
         * @method connectedCallback
         * @return {void}
         */
        connectedCallback(): Promise<{}> {

            const shadowRoot: ShadowRoot | void = this.shadowRoot;

            // Create the shadow boundary if the element doesn't already have one, otherwise clear the shadow
            // boundary for a re-render attempt.
            shadowRoot ? (() => {
                this.innerHTML = '';
                shadowRoot.innerHTML = '';
                this.classList.remove('resolved');
            })() : this.attachShadow({ mode: 'open' });

            return this.render();

        }

        /**
         * @method render
         * @param {Object} [mergeProps = {}]
         * @return {Promise} 
         */
        render(mergeProps?: {} = {}): Promise<{}> {

            return queue.process(async prevProps => {

                const initialProps = { ...mergeProps, ...prevProps, node: this, render: this.render.bind(this) };

                return await middlewares.reduce(async (props, current, index) => {
                    const middleware: props => props = middlewares[index];
                    return await middleware(props);
                }, initialProps);

            });

        }

    });

}
