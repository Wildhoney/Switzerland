/**
 * @method create
 * @param {String} name
 * @param {Function} component
 * @return {Object}
 */
export default function create(name: string, component: () => mixed): void {

    customElements.define(name, class extends HTMLElement {

        /**
         * @method connectedCallback
         * @return {void}
         */
        connectedCallback(): void {
            const node = this.shadowRoot || this.attachShadow({ mode: 'open' });
            return insert(node, component);
        }

    });

}

/**
 * @method insert
 * @param {HTMLElement|ShadowRoot} node
 * @param {Function} component
 * @return {void}
 */
export function insert(node: HTMLElement | ShadowRoot, component: () => mixed): void {



}

// create('todo-manager', pipe(a, b, c));
