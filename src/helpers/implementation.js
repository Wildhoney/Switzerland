/**
 * @constant implementations
 * @type {Object}
 */
const implementations = {

    v0: {

        /**
         * @method customElement
         * @param {String} tag
         * @param {Object} component
         * @return {void}
         */
        customElement: (tag, component) => {

            const prototype = Object.create(window.HTMLElement.prototype, {
                createdCallback: {
                    value: component.connected
                },
                detachedCallback: {
                    value: component.disconnected
                }
            });

            prototype.render = component.render;
            document.registerElement(tag, { prototype });

        },

        /**
         * @method shadowBoundary
         * @param {HTMLElement} node
         * @return {void}
         */
        shadowBoundary: node => node.createShadowRoot()
    },
    v1: {

        /**
         * @method customElement
         * @param {String} tag
         * @param {Object} component
         * @return {void}
         */
        customElement: (tag, component) => {

            window.customElements.define(tag, class extends window.HTMLElement {
                connectedCallback() {
                    component.connected.apply(this);
                }
                disconnectedCallback() {
                    component.disconnected.apply(this);
                }
                render() {
                    component.render.apply(this);
                }
            });

        },

        /**
         * @method shadowBoundary
         * @param {HTMLElement} node
         * @return {void}
         */
        shadowBoundary: node => node.attachShadow({ mode: 'open' })
    }

};

export default typeof window.customElements === 'undefined' ? implementations.v0 : implementations.v1;
