import { errorHandlers } from './middleware';

export { h } from 'picodom';

/**
 * @constant state
 * @type {Symbol}
 */
export const state = Symbol('state');

/**
 * @constant registry
 * @type {WeakMap}
 */
const registry = new WeakMap();

/**
 * @method message
 * @param {String} message
 * @param {String} type
 * @return {void}
 */
function message(message, type) {
    console[type](`\uD83C\uDDE8\uD83C\uDDED Switzerland: ${message}.`);
}

/**
 * @method create
 * @param {String} name
 * @param {Array} middlewares
 * @return {Object}
 */
export function create(name, ...middlewares) {

    /**
     * @class SwitzerlandElement
     * @extends {HTMLElement}
     */
    customElements.define(name, class SwissElement extends HTMLElement {

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
            putState(node, tree, root, prevProps) {
                registry.set(node, { prevProps, vDomTree: { tree, root } });
            },

            /**
             * @method takeVDomTree
             * @param {HTMLElement} node
             * @return {Object|null}
             */
            takeVDomTree(node) {
                const state = Object(registry.get(node));
                return state.vDomTree;
            },

            /**
             * @method takePrevProps
             * @param {HTMLElement} node
             * @return {Object|null}
             */
            takePrevProps(node) {
                const state = Object(registry.get(node));
                return state.prevProps;
            }

        }

        /**
         * @method connectedCallback
         * @return {Promise}
         */
        connectedCallback() {
            const shadowRoot = this.shadowRoot;
            !shadowRoot && this.attachShadow({ mode: 'open' });
            return this.render();
        }

        /**
         * @method disconnectedCallback
         * @return {Promise}
         */
        disconnectedCallback() {
            this.classList.remove('resolved');
            return this.render();
        }

        /**
         * @method render
         * @param {Object} [mergeProps = {}]
         * @return {Promise}
         */
        async render(mergeProps = {}) {

            const prevProps = this[state].takePrevProps(this);
            const initialProps = { prevProps, ...mergeProps, node: this, render: this.render.bind(this) };

            try {

                // Attempt to render the component, catching any errors that may be thrown in the middleware to
                // prevent the component from being in an invalid state. Recovery should ALWAYS be possible!
                return await middlewares.reduce(async (accumP, _, index) => {
                    const middleware = middlewares[index];
                    return middleware(await accumP);
                }, initialProps);

            } catch (err) {

                const getTree = errorHandlers.get(this);
                const prevProps = this[state].takePrevProps(this);
                const consoleError = typeof getTree !== 'function' || !this.isConnected;

                return void consoleError ? console.error(`Switzerland: ${err}`) : do {

                    try {

                        // Attempt to render the component using the error handling middleware.
                        getTree({ node: this, render: this.render.bind(this), error: err, prevProps });

                    } catch (err) {

                        // When the error handling middleware throws an error we'll need to halt the execution
                        // because the error handler should be recovering, not compounding the problem.
                        message('Throwing an error from the recovery middleware is forbidden');
                        console.error(err);

                    }

                };

            } finally {
                
                // Finally we'll add the "resolved" class name regardless of how the error's rendered.
                this.isConnected && !this.classList.contains('resolved') && this.classList.add('resolved');

            }

        }

    });

}
