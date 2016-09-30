import { diff, patch, create as createElement } from 'virtual-dom';
import { htmlFor } from './middleware/html';
import { invokeFor, purgeFor } from './middleware/refs';
import { isDevelopment } from './helpers/env';
import { measureFor, printFor } from './debug/performance';

/**
 * @constant registryKey
 * @type {Symbol}
 */
const registryKey = Symbol('switzerland/registry');

/**
 * @method warning
 * @param {String} message
 * @return {void}
 */
const warning = message => isDevelopment() && console.warn(`Switzerland \uD83C\uDDE8\uD83C\uDDED ${message}.`);

/**
 * @constant implementations
 * @type {Object}
 */
const implementations = {

    v0: {
        hooks: ['attachedCallback', 'detachedCallback'],
        customElement: (name, blueprint) => document.registerElement(name, blueprint),
        shadowBoundary: node => node.createShadowRoot()
    },
    v1: {
        hooks: ['connectedCallback', 'disconnectedCallback'],
        customElement: (name, blueprint) => window.customElements.define(name, blueprint),
        shadowBoundary: node => node.attachShadow({ mode: 'open' })
    }

};

/**
 * @method create
 * @param {String} name
 * @param {Function} render
 * @return {void}
 */
export const create = (name, render) => {

    /**
     * Determines whether we use the v0 or v1 implementation of Custom Elements.
     *
     * @constant implementation
     * @type {Object}
     */
    const implementation = typeof window.customElements === 'undefined' ? implementations.v0 : implementations.v1;

    /**
     * @constant blueprint
     * @type {Object}
     */
    implementation.customElement(name, class extends window.HTMLElement {

        /**
         * @constructor
         */
        constructor() {
            super();
            this[registryKey] = {};
        }

        /**
         * @method connectedCallback
         * @return {void}
         */
        [implementation.hooks[0]]() {

            const node = this;
            const boundary = implementation.shadowBoundary(node);

            const props = render({ node });
            const timeEnd = measureFor('render', props);
            const tree = htmlFor(props);
            const root = createElement(tree);

            // See: https://github.com/Matt-Esch/virtual-dom/pull/413
            boundary.appendChild(root);

            // Invoke any ref callbacks defined in the component's `render` method.
            'ref' in props && invokeFor(node);

            this[registryKey] = { node, tree, root };
            isDevelopment() && timeEnd() && printFor(node);

        }

        /**
         * @method disconnectedCallback
         * @return {void}
         */
        [implementation.hooks[1]]() {

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

            if (!instance) {

                // Rejected as developer has attempted to re-render during the start-up phase.
                // As an alternative we could queue the re-render using `setTimeout` for the next
                // tick, but ideally the developer should setup sensible defaults and thus avoid a
                // re-render during the start-up phase.
                // Queue: setTimeout(this.render.bind(this));
                warning('Casually ignoring an attempted re-render during the start-up phase of a component');
                return;

            }

            const { tree: currentTree, root: currentRoot, node } = instance;

            const props = render({ node });
            const timeEnd = measureFor('render', props);
            const tree = htmlFor(props);

            // Clear any previously defined refs for the current component.
            'ref' in props && purgeFor(node);

            if (node.isConnected) {

                const patches = diff(currentTree, tree);
                const root = patch(currentRoot, patches);

                // Invoke any ref callbacks defined in the component's `render` method.
                'ref' in props && invokeFor(node);

                this[registryKey] = { node, tree, root };
                isDevelopment() && timeEnd() && printFor(node);

            }

        }

    });

};

// Middleware.
export { default as html } from './middleware/html';
export { default as once } from './middleware/once';
export { default as attrs } from './middleware/attributes';
export { default as state } from './middleware/state';
export { default as include } from './middleware/include';
export { default as redux } from './middleware/redux';
export { default as refs } from './middleware/refs';

// Debug.
export { time, timeEnd } from './debug/timer';
export { default as performance } from './debug/performance';

// Helpers.
export { path, pathFor } from './helpers/path';

// Third-party.
export { pipe, compose } from 'ramda';
export { h as element } from 'virtual-dom';
