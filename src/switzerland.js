import { errorHandlers } from './middleware';
import { takePrevProps } from './helpers/registry';

export { h } from 'picodom';

/**
 * @method message :: string -> string -> void
 * @param {String} message
 * @param {String} type
 * @return {void}
 *
 * Takes a message and an optional console type for output. During minification this function will be removed
 * from the generated output if 'NODE_ENV' is defined as 'production', as it will be unused due to 'process.env'
 * checks later on in the code.
 */
function message(message, type = 'error') {
    console[type](`\uD83C\uDDE8\uD83C\uDDED Switzerland: ${message}.`);
}

/**
 * @constant listeners :: Set
 * @type {Map}
 *
 * Responsible for listening for the resolution of specified DOM nodes.
 */
export const listeners = new Set();

/**
 * @method create :: string -> array function -> Promise
 * @param {String} name
 * @param {Array<Function>} middlewares
 * @return {Promise}
 *
 * Takes a valid name for the custom element, as well as a list of the middleware. In the future when browsers
 * support extended native elements, the 'name' argument will allowed to be passed in a slightly different format
 * to indicate its intention to extend a native element.
 *
 * This function yields a promise that is resolved when the first instance of the node has been resolved, which
 * includes the processing of its associated middleware.
 */
export function create(name, ...middlewares) {

    return new Promise(resolve => {

        /**
         * @class SwitzerlandElement
         * @extends {HTMLElement}
         */
        customElements.define(name, class SwissElement extends HTMLElement {

            /**
             * @method connectedCallback :: void -> Promise
             * @return {Promise}
             */
            connectedCallback() {
                !this.shadowRoot && this.attachShadow({ mode: 'open' });
                return this.render();
            }

            /**
             * @method disconnectedCallback :: void -> Promise
             * @return {Promise}
             */
            disconnectedCallback() {
                this.classList.remove('resolved');
                return this.render();
            }

            /**
             * @method render :: object -> Promise
             * @param {Object} [mergeProps = {}]
             * @return {Promise}
             */
            async render(mergeProps = {}) {

                const prevProps = takePrevProps(this);
                const initialProps = { prevProps, ...mergeProps, node: this, render: this.render.bind(this) };

                try {

                    // Attempt to render the component, catching any errors that may be thrown in the middleware to
                    // prevent the component from being in an invalid state. Recovery should ALWAYS be possible!
                    await middlewares.reduce(async (accumP, _, index) => {
                        const middleware = middlewares[index];
                        return middleware(await accumP);
                    }, initialProps);

                } catch (err) {

                    const getTree = errorHandlers.get(this);
                    const prevProps = takePrevProps(this);
                    const consoleError = !getTree || !this.isConnected;

                    consoleError ? (process.env.NODE_ENV !== 'production' && message(err)) : do {

                        try {

                            // Attempt to render the component using the error handling middleware.
                            getTree({ node: this, render: this.render.bind(this), error: err, prevProps });

                        } catch (err) {

                            if (process.env.NODE_ENV !== 'production') {

                                // When the error handling middleware throws an error we'll need to halt the execution
                                // because the error handler should be recovering, not compounding the problem.
                                message(`Throwing an error from the recovery middleware for <${this.nodeName.toLowerCase()} /> is forbidden`);
                                console.error(err);

                            }

                        }

                    };

                }

                // Finally add the "resolved" class name regardless of how the error's rendered.
                this.isConnected && !this.classList.contains('resolved') && this.classList.add('resolved');
                listeners.forEach(listener => listener(this));
                resolve();

            }

        });

    });

}
