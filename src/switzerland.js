import { errorHandlers } from './middleware';
import { dispatchEvent } from './helpers/listeners';
import { takePrevProps } from './helpers/registry';

export { h } from 'picodom';

/**
 * @method message
 * @param {String} message
 * @param {String} type
 * @return {void}
 */
function message(message, type = 'error') {
    console[type](`\uD83C\uDDE8\uD83C\uDDED Switzerland: ${message}.`);
}

/**
 * @method create
 * @param {String} name
 * @param {Array} middlewares
 * @return {Promise}
 */
export function create(name, ...middlewares) {

    return new Promise(resolve => {

        /**
         * @class SwitzerlandElement
         * @extends {HTMLElement}
         */
        customElements.define(name, class SwissElement extends HTMLElement {

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

                const prevProps = takePrevProps(this);
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
                    const prevProps = takePrevProps(this);
                    const consoleError = typeof getTree !== 'function' || !this.isConnected;

                    return void (consoleError ? (process.env.NODE_ENV !== 'production' && message(err)) : do {
                        
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

                    });

                } finally {

                    // Finally add the "resolved" class name regardless of how the error's rendered.
                    this.isConnected && !this.classList.contains('resolved') && this.classList.add('resolved');
                    dispatchEvent('resolved', this);
                    resolve();

                }

            }

        });

    });

}
