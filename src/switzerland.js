import { diff, patch, create } from 'virtual-dom';

/**
 * @constant renders
 * @type {WeakMap}
 */
const renders = new WeakMap();

/**
 * Memorise the Virtual DOM tree for this instance of the node.
 *
 * @method memoriseFor
 * @param {HTMLElement} element
 * @param {Object} model
 * @return {void}
 */
const memoriseFor = (element, model) => {
    renders.set(element, model);
};

/**
 * @method component
 * @param {String} name
 * @param {Function} render
 * @return {Object}
 */
export const component = (name, render) => {

    customElements.define(name, class extends HTMLElement {

        /**
         * @constant observedAttributes
         * @return {String[]}
         */
        static get observedAttributes() {
            return ['name'];
        }

        /**
         * @method connectedCallback
         * @return {void}
         */
        connectedCallback() {

            const tree = render({ element: this });
            const root = create(tree);

            memoriseFor(this, { tree, root });
            this.appendChild(root);

        }

        /**
         * @method attributeChangedCallback
         * @return {void}
         */
        attributeChangedCallback() {

            // Retrieve the previous Virtual DOM tree and node.
            const model = renders.get(this);

            if (model) {

                const tree = render({ element: this });
                const patches = diff(model.tree, tree);
                const root = patch(model.root, patches);

                memoriseFor(this, { tree, root });

            }

        }

    });

};

export { default as attrs } from './middleware/attrs';
export { h as element } from 'virtual-dom';
