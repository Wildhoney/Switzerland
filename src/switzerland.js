import { diff, patch, create as createElement } from 'virtual-dom';

/**
 * @constant registry
 * @type {WeakMap}
 */
const registry = new WeakMap();

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
 * @method htmlFor
 * @param {Object} model
 * @return {Object}
 */
const htmlFor = model => {
    return 'html' in model ? model.html : model;
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
         * @method connectedCallback
         * @return {void}
         */
        [implementation.hooks[0]]() {

            const node = this;
            const boundary = implementation.shadowBoundary(node);
            const rerender = () => this.render();

            const tree = htmlFor(render({ node, render: rerender }));
            const root = createElement(tree);

            // See: https://github.com/Matt-Esch/virtual-dom/pull/413
            boundary.appendChild(root);

            registry.set(this, { node, tree, root });

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

            const instance = registry.get(this);

            if (!instance) {

                // Rejected as developer has attempted to re-render during the start-up phase.
                // As an alternative we could queue the re-render using `setTimeout` for the next
                // tick, but ideally the developer should setup sensible defaults and thus avoid a
                // re-render during the start-up phase.
                // Queue: setTimeout(this.render.bind(this));
                return;

            }

            const { tree: currentTree, root: currentRoot, node } = instance;
            const rerender = () => this.render();

            const tree = htmlFor(render({ node, render: rerender }));

            if (node.isConnected) {

                const patches = diff(currentTree, tree);
                const root = patch(currentRoot, patches);

                registry.set(this, { node, tree, root });

            }

        }

    });

};

export { default as html } from './middleware/html';
export { default as once } from './middleware/once';
export { default as attrs } from './middleware/attributes';
export { default as state } from './middleware/state';
export { default as include } from './middleware/include';
export { default as redux } from './middleware/redux';
export { time, timeEnd } from './debug/timer';
export { h as element } from 'virtual-dom';
