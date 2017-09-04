import { errorHandlers } from './middleware';
import type { TreeRoot, Props } from './middleware';

export { h } from 'picodom';

/**
 * @constant state
 * @type {Symbol}
 */
export const state: Symbol = Symbol('state');

/**
 * @method message
 * @param {String} message
 * @param {String} type
 * @return {void}
 */
function message(message: string, type: 'error' | 'info' | 'log' = 'error') {
    console[type](`\uD83C\uDDE8\uD83C\uDDED Switzerland: ${message}.`);
}

/**
 * @method create
 * @param {String} name
 * @param {Array} middlewares
 * @return {Object}
 */
export function create(name: string, ...middlewares: Array<Props>): void {

    /**
     * @constant queue
     * @type {Symbol}
     */
    const queue: Symbol = Symbol('queue');

    /**
     * @constant registry
     * @type {Map}
     */
    const registry: Map<HTMLElement, TreeRoot> = new Map();

    /**
     * @class SwitzerlandElement
     * @extends {window.HTMLElement}
     */
    window.customElements.define(name, class SwissElement extends window.HTMLElement {

        /**
         * @constant state
         * @type {Object}
         */
        [state]: {} = {

            /**
             * @method putState
             * @param {Object} tree
             * @param {Object} root
             * @param {Object} prevProps
             * @return {void}
             */
            putState(node: HTMLElement, tree: {}, root: HTMLElement, prevProps: {}): void {
                registry.set(node, { tree, root, prevProps });
            },

            /**
             * @method takeVDomTree
             * @param {HTMLElement} node
             * @return {Object|null}
             */
            takeVDomTree(node: HTMLElement): {} | void {
                return registry.get(node) || null;
            },

            /**
             * @method takePrevProps
             * @param {HTMLElement} node
             * @return {Object|null}
             */
            takePrevProps(node: HTMLElement): {} | void {
                return Object(registry.get(node)).prevProps || null;
            }

        }

        /**
         * @method connectedCallback
         * @return {Promise}
         */
        connectedCallback(): Promise<Props> {
            const shadowRoot: ShadowRoot | void = this.shadowRoot;
            !shadowRoot && this.attachShadow({ mode: 'open' });
            return this.render();
        }

        /**
         * @method disconnectedCallback
         * @return {Promise}
         */
        disconnectedCallback(): Promise<Props> {
            this.classList.remove('resolved');
            return this.render();
        }

        /**
         * @method render
         * @param {Object} [mergeProps = {}]
         * @return {Promise}
         */
        async render(mergeProps?: {} = {}): Promise<Props> {

            const prevProps = this[state].takePrevProps(this);
            const initialProps = { prevProps, ...mergeProps, node: this, render: this.render.bind(this) };

            try {

                const result = await middlewares.reduce(async (accumP, _, index) => {
                    const middleware = middlewares[index];
                    return middleware(await accumP);
                }, initialProps);

                window.document.contains(this) && !this.classList.contains('resolved') && this.classList.add('resolved');
                return result;

            } catch (err) {
                
                if (!errorHandlers.has(this) || !window.document.contains(this)) {
                    return console.error(`Switzerland: ${err}`);
                }
    
                const getTree: {} = errorHandlers.get(this);
                const prevProps = this[state].takePrevProps(this);

                try {

                    const result = await getTree({ node: this, render: this.render.bind(this), error: err, prevProps });
                    !this.classList.contains('resolved') && this.classList.add('resolved');
                    return result;

                } catch (err) {

                    // We need to try-catch the recovery component because otherwise we'd be facing a potential
                    // infinite loop of throwing error messages.
                    message('Throwing an error from the recovery middleware is forbidden');
                    console.error(err);

                }

            }

        }

    });

}
