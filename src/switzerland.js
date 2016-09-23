import { diff, patch, create as createElement } from 'virtual-dom';

/**
 * @constant registry
 * @type {WeakMap}
 */
const registry = new WeakMap();

/**
 * @method create
 * @param {String} name
 * @param {Function} render
 * @return {void}
 */
export const create = (name, render) => {

    window.customElements.define(name, class extends window.HTMLElement {

        /**
         * @method connectedCallback
         * @return {void}
         */
        connectedCallback() {

            const node = this;
            const boundary = node.attachShadow({ mode: 'open' });
            const rerender = () => this.render();

            const tree = render({ node, render: rerender });
            const root = createElement(tree);

            // See: https://github.com/Matt-Esch/virtual-dom/pull/413
            boundary.appendChild(root);

            registry.set(this, { node, tree, root });

        }

        /**
         * @method disconnectedCallback
         * @return {void}
         */
        disconnectedCallback() {

            // Once the node has been removed then we perform one last pass, however the render function
            // ensures the node is in the DOM before any reconciliation takes place, thus saving resources.
            this.render();

        }

        /**
         * @method render
         * @return {Object}
         */
        render() {

            const instance = registry.get(this);
            const { tree: currentTree, root: currentRoot, node } = instance;
            const rerender = () => this.render();

            const tree = render({ node, render: rerender });

            if (node.isConnected) {

                const patches = diff(currentTree, tree);
                const root = patch(currentRoot, patches);

                registry.set(this, { node, tree, root });

            }

        }

    });

};

export { default as attrs } from './middleware/attributes';
export { default as state } from './middleware/state';
export { default as include } from './middleware/include';
export { default as redux } from './middleware/redux';
export { h as element } from 'virtual-dom';
