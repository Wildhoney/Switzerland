import { patch } from 'picodom';
import { meta } from './switzerland';

/**
 * @method html
 * @param {Object} props
 * @return {Function}
 */
export function html(markup: ({} => {})): any {

    return props => {

        const isInitial: boolean = !props.node.shadowRoot.firstChild;
        const previousProps: { tree?: HTMLElement, root?: HTMLElement } = props[meta] || {};
        const tree: {} = markup({ ...props, render: props.render });

        // Patch the previous tree with the current tree, specifying the root element, which is the custom component.
        const root: HTMLElement = patch(previousProps.tree, tree, previousProps.root);

        // Insert the DOM representation into the shadow boundary if it's the first render of the component.
        isInitial && props.node.shadowRoot.insertBefore(root, props.node.shadowRoot.firstChild);

        return { ...props, meta: { ...props[meta], tree, root } };

    };

}
