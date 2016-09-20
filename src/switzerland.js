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

            const element = this;
            const boundary = element.attachShadow({ mode: 'open' });

            const tree = render({ element, boundary });
            const root = create(tree);

            memoriseFor(element, { tree, root, element, boundary });
            boundary.appendChild(root);

            // Favour mutation observer over `attributeChangedCallback` as the latter requires
            // specifying the observed attributes on the class.
            const observer = new MutationObserver(this.render.bind(this));
            observer.observe(element, { attributes: true });

            // observer.disconnect();

        }

        /**
         * @method render
         * @return {void}
         */
        render() {

            // Retrieve the previous Virtual DOM tree and node.
            const model = renders.get(this);

            if (model) {

                const { tree: currentTree, root: currentRoot, element, boundary } = model;

                const tree = render({ element, boundary });
                const patches = diff(currentTree, tree);
                const root = patch(currentRoot, patches);

                memoriseFor(this, { tree, root, element, boundary });

            }

        }

    });

};

export { default as attrs } from './middleware/attrs';
export { h as element } from 'virtual-dom';
