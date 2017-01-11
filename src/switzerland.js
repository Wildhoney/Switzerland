import { diff, patch, create as createElement } from 'virtual-dom';
import { h as vdomH } from 'virtual-dom';
import OrderlyQueue from 'orderly-queue';
import implementation from './helpers/implementation';
import isDevelopment from './helpers/environment';
import html, { htmlFor } from './middleware/html';
import { htmlErrorFor } from './middleware/rescue';
import { invokeFor, purgeFor } from './middleware/refs';
import { children, awaitEventName } from './middleware/await';
import { error } from './helpers/messages';

/**
 * @constant options
 * @type {Object}
 */
export const options = {
    DEFAULT: 1,
    ASYNC: 2,
    RESET: 4,
    DEFER: 8
};

/**
 * @constant queueKey
 * @type {Symbol}
 */
const queueKey = Symbol('switzerland/queue');

/**
 * @constant prevPropsKey
 * @type {Symbol}
 */
export const prevPropsKey = Symbol('switzerland/last-props');

/**
 * @method clearHTMLFor
 * @param {HTMLElement} node
 * @return {void}
 */
const clearHTMLFor = node => {
    node.shadowRoot.innerHTML = '';
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
 * @method handle
 * @param {HTMLElement} node
 * @param {Function} component
 * @return {Object}
 */
const handle = async (node, component) => {

    const render = node.render.bind(node);
    const attached = isAttached(node);
    const prevProps = node[prevPropsKey] || {};

    try {

        // Render the component and yield the `props` along with the virtual-dom vtree.
        const props = await component({ node, render, attached, prevProps });
        return { props, tree: htmlFor(props) };

    } catch (err) {

        // As the component has raised an error during the processing of its middleware, we'll attempt
        // to find the error vtree from the component's `error` middleware, otherwise we'll use a
        // the Switzerland default vtree as well as raising an error to prevent the component from being
        // rendered in an invalid state.
        const componentError = htmlErrorFor(node) || html(props => {

            if (isDevelopment()) {

                // Display the uncaught error.
                const nodeName = props.node.nodeName.toLowerCase();
                error(`<${nodeName} /> threw an uncaught error when rendering: ${props.error.message || props.error}`);

            }

            return <span />;

        });

        try {

            // Invoke the middleware for rendering the error vtree for the component.
            const props = await componentError({ node, render: () => render(false), attached, prevProps, error: err });
            return { props, tree: htmlFor(props) };

        } catch (err) {

            // Catch any errors that were thrown in the error handler, which is forbidden as otherwise
            // we'd be entering an Inception-esque down-the-rabbit-hole labyrinth.
            error('Throwing an error within an error handler is forbidden, and as such should be entirely side-effect free');
            return { props: { node }, tree: <span /> };

        }

    }

};

/**
 * @method transition
 * @param {HTMLElement} node
 * @param {Object} tree
 * @param {Object} props
 * @param {HTMLElement} currentRoot
 * @return {Object}
 */
const transition = async (node, tree, props, currentRoot) => {

    // Prevent any interactions with the current root, as technically it is now inactive.
    currentRoot.style.pointerEvents = 'none';

    // Render the updated vtree and hide it.
    const boundary = node.shadowRoot;
    const root = createElement(tree);
    root.style.display = 'none';
    boundary.insertBefore(root, boundary.firstChild);

    // Wait until the children have been resolved.
    await children(props);

    // ...And then remove the previous child and show the newly rendered vtree.
    currentRoot.remove();
    root.style.display = 'block';

    return { node, tree, root };

};

/**
 * @method create
 * @param {String} name
 * @param {Function} component
 * @return {void}
 */
export function create(name, component) {

    /**
     * @constant component
     * @type {Object}
     */
    implementation.customElement(name, {

        /**
         * @method connectedCallback
         * @return {void}
         */
        connected() {

            const queue = this[queueKey] = new OrderlyQueue({ value: '', next: prevProps => {

                // Memorise the previous props as it's useful in the methods middleware.
                this[prevPropsKey] = prevProps;

            } });

            queue.process(async () => {

                // Setup the shadow boundary for the current node.
                const node = this;
                node.shadowRoot && clearHTMLFor(node);
                const boundary = node.shadowRoot || implementation.shadowBoundary(node);

                try {

                    // Apply the middleware and wait for the props to be returned.
                    const { props, tree } = await handle(node, component);

                    // Setup the Virtual DOM instance, and then append the component to the DOM.
                    const root = createElement(tree);
                    boundary.insertBefore(root, boundary.firstChild);

                    // Invoke any ref callbacks defined in the component's `render` method.
                    'ref' in props && invokeFor(node);

                    /**
                     * @constant resolved
                     * @type {Promise}
                     */
                    node.resolved = (async () => {

                        // Setup listener for children being resolved.
                        await children(props);

                        // Emit the event that the node has been resolved.
                        node.dispatchEvent(new window.CustomEvent(awaitEventName, {
                            detail: node,
                            bubbles: true,
                            composed: true
                        }));

                        return node;

                    })();

                    return { tree, root, node, props };

                } catch (err) {

                    // Capture any errors that were thrown in processing the component.
                    error(err);

                }

            });

        },

        /**
         * @method disconnectedCallback
         * @return {void}
         */
        disconnected() {

            clearHTMLFor(this);

            // Once the node has been removed then we perform one last pass, however the render function
            // ensures the node is in the DOM before any reconciliation takes place, thus saving resources.
            this.render();

        },

        /**
         * @method render
         * @param {Boolean} [delta = true]
         * @return {void}
         */
        render(delta = true) {

            this[queueKey].process(async instance => {

                // Gather the props from the previous rendering of the component.
                const { tree: currentTree, root: currentRoot, node } = instance;

                try {

                    // Apply the middleware and wait for the props to be returned.
                    const { props, tree } = await handle(node, component);

                    // Use either the loading root and tree, or from the previous render.
                    const patchRoot = props.root || currentRoot;
                    const patchTree = props.tree || currentTree;

                    // Clear any previously defined refs for the current component.
                    'ref' in props && purgeFor(node);

                    if (node.isConnected) {

                        // Determine whether we're transitioning or patching.
                        return delta ? (() => {

                            // Diff and patch the current DOM state with the new one.
                            const patches = diff(patchTree, tree);
                            const root = patch(patchRoot, patches);

                            // Invoke any ref callbacks defined in the component's `render` method.
                            'ref' in props && invokeFor(node);

                            return { node, tree, root, props };

                        })() : transition(node, tree, props, currentRoot);

                    }

                } catch (err) {

                    // Capture any errors that were thrown in processing the component.
                    error(err);

                }

            });

        }

    });

}

export { default as path } from './helpers/path';
export { pipe, compose } from './helpers/composition';
export { resolved } from './middleware/await';

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
