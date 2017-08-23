import OrderlyQueue from 'orderly-queue';
import { errorHandlers } from './middleware';

export { h } from 'picodom';

/**
 * @constant vDomState
 * @type {Symbol}
 */
export const vDomState: Symbol = Symbol('vdom-state');

/**
 * @method create
 * @param {String} name
 * @param {Array} middlewares
 * @return {Object}
 */
export function create(name: string, ...middlewares: Array<() => mixed>): void {

    /**
     * @constant queue
     * @type {Symbol}
     */
    const queue: Symbol = Symbol('queue');

    /**
     * @constant registry
     * @type {Map}
     */
    const registry: Map<string, { tree: {}, root: HTMLElement }> = new Map();

    /**
     * @class SwitzerlandElement
     * @extends {window.HTMLElement}
     */
    window.customElements.define(name, class SwitzerlandElement extends window.HTMLElement {

        /**
         * @constant queue
         * @type {Symbol}
         */
        [queue]: OrderlyQueue = new OrderlyQueue({ error: err => {

            if (!errorHandlers.has(this)) {
                return void console.error(`Switzerland: ${err}`);
            }

            return this[queue].process((): Promise<void> => {
                const getTree: {} = errorHandlers.get(this);
                return getTree({ node: this, render: this.render.bind(this), error: err });
            });

        } });

        /**
         * @constant vDomState
         * @type {Object}
         */
        [vDomState] = {

            /**
             * @method putVDomState
             * @param {Object} tree
             * @param {Object} root
             * @return {void}
             */
            putVDomState(tree: {}, root: HTMLElement): void {
                registry.set('state', { tree, root });
            },

            /**
             * @method takeVDomState
             * @return {Object|null}
             */
            takeVDomState(): {} | void {
                return registry.has('state') ? registry.get('state') : null;
            }

        }

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

            return this[queue].process(async prevProps => {

                const initialProps = { ...prevProps, ...mergeProps, node: this, render: this.render.bind(this) };

                return middlewares.reduce(async (accumP, current, index) => {
                    const middleware: props => props = middlewares[index];
                    const props = await accumP;
                    return middleware(props);
                }, initialProps);

            });

        }

    });

}
