import { diff, patch, create as createElement } from 'virtual-dom';
import { htmlFor } from './middleware/html';
import { invokeFor, purgeFor } from './middleware/refs';
import { hasResolvedTree, awaitEventName } from './middleware/await';
import isDevelopment from './helpers/env';

/**
 * @constant registryKey
 * @type {Symbol}
 */
export const registryKey = Symbol('switzerland/registry');

/**
 * @constant childrenKey
 * @type {Symbol}
 */
export const childrenKey = Symbol('switzerland/children');

/**
 * @method message
 * @param {String} text
 * @param {Function} fn
 * @return {void}
 */
const message = (text, fn) => isDevelopment() && fn(`Switzerland \uD83C\uDDE8\uD83C\uDDED ${text}.`);

/**
 * @method error
 * @param {String} text
 * @return {void}
 */
export const error = text => message(text, console.error);

/**
 * @method warning
 * @param {String} text
 * @return {void}
 */
export const warning = text => message(text, console.warn);

/**
 * @constant implementations
 * @type {Object}
 */
const implementations = {

    v0: {
        hooks: ['attachedCallback', 'detachedCallback'],
        customElement: (tag, extend, component) => document.registerElement(tag, component),
        shadowBoundary: node => node.createShadowRoot()
    },
    v1: {
        hooks: ['connectedCallback', 'disconnectedCallback'],
        customElement: (tag, extend, component) => window.customElements.define(tag, component),
        shadowBoundary: node => node.attachShadow({ mode: 'open' })
    }

};

/**
 * @method clearHTMLFor
 * @param {HTMLElement} node
 * @return {void}
 */
const clearHTMLFor = node => {
    node.shadowRoot.innerHTML = '';
};

/**
 * @method create
 * @param {String} name
 * @param {Function} component
 * @return {void}
 */
export const create = (name, component) => {

    const [ tag, extend ] = name.split('/');
    const Prototype = extend ? Object.getPrototypeOf(extend) : window.HTMLElement;

    /**
     * Determines whether we use the v0 or v1 implementation of Custom Elements.
     *
     * @constant implementation
     * @type {Object}
     */
    const implementation = typeof window.customElements === 'undefined' ? implementations.v0 : implementations.v1;

    /**
     * @constant component
     * @type {Object}
     */
    implementation.customElement(tag, extend, class extends Prototype {

        /**
         * @constructor
         */
        constructor() {
            super();
            this[registryKey] = {};
            this[childrenKey] = null;
        }

        /**
         * @method connectedCallback
         * @return {void}
         */
        [implementation.hooks[0]]() {

            const node = this;
            node.shadowRoot && clearHTMLFor(node);
            const boundary = node.shadowRoot || implementation.shadowBoundary(node);
            this[childrenKey] = node.innerHTML;

            component({ node, render: node.render.bind(node), children: this[childrenKey] }).then(props => {

                const tree = htmlFor(props);
                const root = createElement(tree);

                // See: https://github.com/Matt-Esch/virtual-dom/pull/413
                boundary.insertBefore(root, boundary.firstChild);

                // Invoke any ref callbacks defined in the component's `render` method.
                'ref' in props && invokeFor(node);

                this[registryKey] = { node, tree, root, props };

                node.resolved = new Promise(resolve => {

                    // Setup listener for children being resolved.
                    hasResolvedTree(props).then(() => {

                        // Emit the event that the node has been resolved.
                        node.dispatchEvent(new window.CustomEvent(awaitEventName, {
                            detail: node,
                            bubbles: true,
                            composed: true
                        }));

                        // Tree has been entirely resolved!
                        resolve();

                    });

                });

            }).catch(error);

        }

        /**
         * @method disconnectedCallback
         * @return {void}
         */
        [implementation.hooks[1]]() {

            clearHTMLFor(this);

            // Once the node has been removed then we perform one last pass, however the render function
            // ensures the node is in the DOM before any reconciliation takes place, thus saving resources.
            this.render();

        }

        /**
         * @method render
         * @return {void}
         */
        render() {

            const instance = this[registryKey];

            if (!instance || !instance.node) {

                // Rejected as developer has attempted to re-render during the start-up phase.
                // As an alternative we could queue the re-render using `setTimeout` for the next
                // tick, but ideally the developer should setup sensible defaults and thus avoid a
                // re-render during the start-up phase.
                // Queue: setTimeout(this.render.bind(this));
                warning('Casually ignoring an attempted re-render during the start-up phase of a component');
                return;

            }

            const { tree: currentTree, root: currentRoot, node } = instance;

            component({ node, render: node.render.bind(node), children: this[childrenKey] }).then(props => {

                const tree = htmlFor(props);

                // Clear any previously defined refs for the current component.
                'ref' in props && purgeFor(node);

                if (node.isConnected) {

                    const patches = diff(currentTree, tree);
                    const root = patch(currentRoot, patches);

                    // Invoke any ref callbacks defined in the component's `render` method.
                    'ref' in props && invokeFor(node);

                    this[registryKey] = { node, tree, root, props };

                }

            }).catch(error);

        }

    });

};

export { default as path } from './helpers/path';
export { pipe, compose } from './helpers/composition';
export { h as element } from 'virtual-dom';
