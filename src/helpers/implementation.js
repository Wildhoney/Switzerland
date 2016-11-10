/**
 * @constant implementations
 * @type {Object}
 */
const implementations = {

    v0: {
        hooks: ['attachedCallback', 'detachedCallback'],
        customElement: (tag, component) => document.registerElement(tag, component),
        shadowBoundary: node => node.createShadowRoot()
    },
    v1: {
        hooks: ['connectedCallback', 'disconnectedCallback'],
        customElement: (tag, component) => window.customElements.define(tag, component),
        shadowBoundary: node => node.attachShadow({ mode: 'open' })
    }

};

export default typeof window.customElements === 'undefined' ? implementations.v0 : implementations.v1;
