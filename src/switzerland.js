import { takePrevProps, errorHandlers, sendEvent } from './middleware';

export { h } from 'picodom';
export { path } from './middleware';

/**
 * @constant member ∷ Symbol
 * @type {Symbol}
 */
const member = Symbol('Switzerland');

/**
 * @method message ∷ String → String → void
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
 * @constant eventName ∷ String
 * @type {String}
 */
export const eventName = 'switzerland/resolved';

/**
 * @constant namespace ∷ String|void
 * @type {String|undefined}
 */
const namespace = document.currentScript.dataset.namespace;

/**
 * @constant separator ∷ String
 * @type {String}
 */
const separator = '_';

/**
 * @method translate ∷ String → String
 * @param {String} name
 * @return {String}
 */
export const translate = name => {

    try {
        const tag = name.toLowerCase().match(/_(.+-.+)/i)[1];
        return namespace ? `${namespace}${separator}${tag}` : tag;
    } catch (err) {
        return name;
    }

};

/**
 * @class CancelError ∷ CancelError
 * @extends {Error}
 */
class CancelError extends Error {}

/**
 * @class InteruptError ∷ InteruptError
 * @extends {Error}
 */
class InteruptError extends Error {}

/**
 * @method throwInterrupt ∷ void
 * @return {void}
 */
const throwInterrupt = () => {
    throw new InteruptError();
};

/**
 * @method create ∷ Props p ⇒ String → [(p → p)] → void
 * @param {String} name
 * @param {Array<Function>} middlewares
 * @return {void}
 *
 * Takes a valid name for the custom element, as well as a list of the middleware. In the future when browsers
 * support extended native elements, the 'name' argument will allowed to be passed in a slightly different format
 * to indicate its intention to extend a native element.
 *
 * This function yields a promise that is resolved when the first instance of the node has been resolved, which
 * includes the processing of its associated middleware.
 */
export function create(name, ...middlewares) {

    /**
     * @class SwitzerlandElement
     * @extends {HTMLElement}
     */
    customElements.define(namespace ? `${namespace}${separator}${name}` : name, class extends HTMLElement {

        /**
         * @constructor ∷ void
         * @return {void}
         */
        constructor() {
            super();
            this[member] = { task: null };
        }

        /**
         * @method connectedCallback ∷ Promise void
         * @return {Promise}
         */
        connectedCallback() {
            !this.shadowRoot && this.attachShadow({ mode: 'open' });
            return this.render();
        }

        /**
         * @method disconnectedCallback ∷ Promise void
         * @return {Promise}
         */
        disconnectedCallback() {
            this.classList.remove('resolved');
            return this.render();
        }

        /**
         * @method render ∷ ∀ a. Object String a → Promise void
         * @param {Object} [props = {}]
         * @return {Promise}
         */
        async render(props = {}) {

            // Set the latest task to be the active task, preventing the other running tasks
            // from continuing any further.
            const task = Symbol(name);
            this[member].task = task;
            const isActive = () => this[member].task === task;

            // Setup the props for the `initialProps`.
            const prevProps = takePrevProps(this);

            /**
             * @constant Props p ⇒ initialProps ∷ p
             * @type {Object}
             */
            const initialProps = {
                ...prevProps,
                ...props,
                prevProps,
                state: { ...(prevProps || {}).state, ...props.state },
                node: this,
                boundary: this.shadowRoot,
                render: this.render.bind(this),
                dispatch: (name, data) => sendEvent(name, { node: this, data, version: 1 }),
                cancel: () => { throw new CancelError(); }
            };

            try {

                // Attempt to render the component, catching any errors that may be thrown in the middleware to
                // prevent the component from being in an invalid state. Recovery should ALWAYS be possible!
                await middlewares.reduce(async (accumP, _, index) => {

                    const middleware = middlewares[index];

                    // We'll check if the task is still active before the middleware item is processed.
                    !isActive() && throwInterrupt();

                    // Process the middleware item.
                    const props = await accumP;

                    // ...And afterwards.
                    return isActive() ? middleware(props) : throwInterrupt();

                }, initialProps);

            } catch (err) {

                const isKnownException = err instanceof InteruptError || err instanceof CancelError;

                if (!isKnownException) {

                    const getTree = errorHandlers.get(this);
                    const consoleError = !getTree || !this.isConnected;

                    consoleError ? (process.env.NODE_ENV !== 'production' && message(err)) : do {

                        try {

                            // Attempt to render the component using the error handling middleware.
                            getTree({ node: this, render: this.render.bind(this), error: err, prevProps: takePrevProps(this) });

                        } catch (err) {

                            if (process.env.NODE_ENV !== 'production') {

                                // When the error handling middleware throws an error we'll need to halt the execution
                                // because the error handler should be recovering, not compounding the problem.
                                message(`Throwing an error from the recovery middleware for <${this.nodeName} /> is forbidden`);
                                console.error(err);

                            }

                        }

                    };

                }

            }

            try {

                // Ensure the task is still relevent before continuing.
                !isActive() && throwInterrupt();

                // Add the "resolved" class name regardless of how the component's rendered.
                this.isConnected && !this.classList.contains('resolved') && this.classList.add('resolved');

                // Finally dispatch the event for parent components to be able to resolve.
                sendEvent(eventName, { node: this, version: 1 });

                // Task has been successfully processed.
                this[member].task = null;

            } catch (err) {}

        }

    });

}
