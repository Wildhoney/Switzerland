import vdomH from 'virtual-dom/h';
import OrderlyQueue from 'orderly-queue';
import implementation from './helpers/element';
import { htmlErrorFor } from './middleware/rescue';
import { invokeFor, purgeFor } from './middleware/refs';
import { children, awaitEventName } from './middleware/await';
import { error } from './helpers/messages';
import { coreKey, prevPropsKey } from './helpers/keys';
import { dispatchEvent } from './helpers/events';

/**
 * @constant queueMap
 * @type {WeakMap}
 */
const queueMap = new WeakMap();

/**
 * @constant elementMap
 * @type {Map}
 */
export const elementMap = new Map();

/**
 * @method clearHTMLFor
 * @param {HTMLElement} node
 * @return {void}
 */
const clearHTMLFor = node => {
    node.shadowRoot.innerHTML = '';
    node.classList.remove('resolved');
};

/**
 * @method isAttached
 * @param {HTMLElement} node
 * @return {Boolean}
 */
const isAttached = node => {
    return 'isConnected' in node ? node.isConnected : document.contains(node);
};

/**
 * @method defaultProps
 * @return {Object}
 */
export const defaultProps = () => {

    const coreMap = new Map();

    return {

        /**
         * @method writeVDomState
         * @param {Object} tree
         * @param {Object} root
         * @return {void}
         */
        writeVDomState(tree, root) {
            coreMap.set('state', { tree, root });
        },

        /**
         * @method readVDomState
         * @return {Object|null}
         */
        readVDomState() {

            return coreMap.has('state') ? (() => {

                // Read the tree and root state before deleting them.
                const state = coreMap.get('state');
                coreMap.delete('state');
                return state;

            })() : null;

        }

    };

};

/**
 * @method render
 * @param {HTMLElement} node
 * @param {Function} component
 * @param {Object} [props  = {}]
 * @return {Object}
 */
const render = async (node, component, props = { prevProps: {} }) => {

    const render = node.render.bind(node);
    const attached = isAttached(node);

    return await component({ node, render, attached, [coreKey]: props[coreKey] || defaultProps(), ...props });

};

/**
 * @method handleResolve
 * @param {HTMLElement} node
 * @param {Object} props
 * @return {void}
 */
const handleResolve = (node, props) => {

    /**
     * @constant resolved
     * @type {Promise}
     */
    node.resolved = (async () => {

        // Setup listener for children being resolved.
        await children(props);

        // Emit the event that the node has been resolved.
        dispatchEvent(awaitEventName, { node });

    })();

};

/**
 * @method handleProps
 * @return {Function}
 */
const handleProps = node => {

    return prevProps => {

        // Memorise the previous props as it's useful in the methods middleware.
        node[prevPropsKey] = prevProps;

    };

};

/**
 * @method appendComponent
 * @param {HTMLElement} node
 * @param {Object} boundary
 * @param {Object} props
 * @return {Object}
 */
const appendComponent = (node, boundary, props) => {

    // Invoke any ref callbacks defined in the component's `render` method.
    'ref' in props && invokeFor(node);

    // Handle the resolution for the node that's just been rendered.
    handleResolve(node, props);

    return props;

};

/**
 * @method create
 * @param {String} name
 * @param {Function} component
 * @return {void}
 */
export function create(name, component) {

    // Register the current component in the element map.
    elementMap.set(name, component);

    /**
     * @constant component
     * @type {Object}
     */
    implementation && implementation.customElement(name, {

        /**
         * @method connectedCallback
         * @return {void}
         */
        connected() {

            // Instantiate the processing queue and store it in the weak map.
            const queue = new OrderlyQueue({ next: handleProps(this) });
            queueMap.set(this, queue);

            // Remove any existing content from the node, and fetch the reference to the
            // shadow boundary.
            this.shadowRoot && clearHTMLFor(this);
            const boundary = this.shadowRoot || implementation.shadowBoundary(this);

            queue.process(async () => {

                try {

                    // Setup the Virtual DOM instance, and then append the component to the DOM.
                    const props = await render(this, component);
                    return appendComponent(this, boundary, props);

                } catch (err) {

                    const component = htmlErrorFor(this);

                    if (component) {

                        // Render the error component if we have an error handler.
                        const props = await render(this, component, { error: err });
                        return appendComponent(this, boundary, props);

                    }

                    // Component threw an error on start-up without an error handler to rescue it
                    // and therefore the component is unrecoverable.
                    error(err);

                }

            });

        },

        /**
         * @method disconnectedCallback
         * @return {void}
         */
        disconnected() {

            // Remove all child HTML nodes for the component.
            clearHTMLFor(this);

            // Once the node has been removed then we perform one last pass, however the render function
            // ensures the node is in the DOM before any reconciliation takes place, thus saving resources.
            this.render();

        },

        /**
         * @method render
         * @param {Object} [mergeProps = {}]
         * @return {void}
         */
        render(mergeProps = {}) {

            queueMap.get(this).process(async prevProps => {

                // Clear any previously defined refs for the current component.
                purgeFor(this);

                try {

                    // Apply the middleware and wait for the props to be returned.
                    const props = await render(this, component, { ...mergeProps, prevProps, [coreKey]: prevProps[coreKey] });

                    // Invoke any ref callbacks defined in the component's `render` method.
                    'ref' in props && invokeFor(this);

                    return props;

                } catch (err) {

                    const component = htmlErrorFor(this);
                    const state = prevProps[coreKey].readVDomState();

                    if (component) {

                        if (state) {

                            // Render the error component if we have an error handler.
                            return await render(this, component, {
                                ...prevProps, error: err,

                                // However the difference in this instance is that we need to write a new
                                // root and tree because an intermediary HTML rendered a new tree before
                                // the error was raised.
                                [coreKey]: { ...prevProps[coreKey], ...state }

                            });

                        }

                        // Render the error component if we have an error handler.
                        return await render(this, component, { ...prevProps, error: err });

                    }

                    // Otherwise we'll simply show the error message and return the previous props.
                    error(err);

                    return prevProps;

                }

            });

        }

    });

}

export { default as path } from './helpers/path';
export { pipe, compose } from './helpers/utilities';
export { resolved } from './middleware/await';
export { default as options } from './helpers/options';

/**
 * @method element
 * @param {HTMLElement} el
 * @param {Object} props
 * @param {Array} children
 * @return {Object}
 */
export const element = (el, props, ...children) => {
    return vdomH(el, props, children);
};

/**
 * @method h
 * @alias element
 * @return {Object}
 */
export const h = element;
