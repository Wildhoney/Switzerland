import OrderlyQueue from 'orderly-queue';
import { errorHandlers } from './middleware';
import type { TreeRoot } from './middleware';

export { h } from 'picodom';

/**
 * @constant state
 * @type {Symbol}
 */
export const state: Symbol = Symbol('state');

/**
 * @method renderMessage
 * @param {String} message 
 * @param {String} type
 * @return {void}
 */
function renderMessage(message: string, type: 'error' | 'info' | 'log' = 'error') {
    console[type](`\uD83C\uDDE8\uD83C\uDDED Switzerland: ${message}.`);
}

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
    const registry: Map<string, TreeRoot> = new Map();

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

            return this[queue].process(async (): Promise<void> => {

                const getTree: {} = errorHandlers.get(this);
                const prevProps = this[state].takePrevProps();

                try {
                    return await getTree({ node: this, render: this.render.bind(this), error: err, prevProps });
                } catch (err) {

                    // We need to try-catch the recovery component because otherwise we'd be facing a potential
                    // infinite loop of throwing error messages.
                    return void renderMessage('Throwing an error from the recovery middleware is forbidden');

                }
                
            });

        } });

        /**
         * @constant state
         * @type {Object}
         */
        [state] = {

            /**
             * @method putState
             * @param {Object} tree
             * @param {Object} root
             * @param {Object} prevProps
             * @return {void}
             */
            putState(tree: {}, root: HTMLElement, prevProps: {}): void {
                registry.set('vdomTree', { tree, root });
                prevProps && registry.set('prevProps', prevProps);
            },

            /**
             * @method takeVDomTree
             * @return {Object|null}
             */
            takeVDomTree(): {} | void {
                return registry.has('vdomTree') ? registry.get('vdomTree') : null;
            },

            /**
             * @method takePrevProps
             * @return {Object|null}
             */
            takePrevProps(): {} | void {
                const { prevProps, render, node, ...rest } = registry.get('prevProps') || {};
                return rest;
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

            const result = this[queue].process(async () => {

                const prevProps = this[state].takePrevProps();
                const initialProps = { prevProps, ...mergeProps, node: this, render: this.render.bind(this) };

                return middlewares.reduce(async (accumP, current, index) => {
                    const middleware: props => props = middlewares[index];
                    const props = await accumP;
                    return middleware(props);
                }, initialProps);

            });

            !this.classList.contains('resolved') && this.classList.add('resolved');
            return result;

        }

    });

}
