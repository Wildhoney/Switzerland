import { patch } from 'picodom';
import { vDomState } from './switzerland';

type Props = {} => {};

/**
 * @constant errorHandlers
 * @type {WeakMap}
 */
export const errorHandlers: WeakMap<Symbol, Function> = new WeakMap();

/**
 * @method recover
 * @param {Function} getTree
 * @return {Function}
 */
export function recover(getTree: Props => Props): any {

    return props => {
        !errorHandlers.has(props.node) && errorHandlers.set(props.node, getTree);
        return props;
    };

}

/**
 * @method html
 * @param {Function} getTree
 * @return {Function}
 */
export function html(getTree: Props => Props): any {

    type PreviousProps = { tree?: HTMLElement, root?: HTMLElement };

    return props => {

        const isInitial: boolean = !props.node.shadowRoot.firstChild;
        const previousProps: PreviousProps = props.node[vDomState].takeVDomState() || {};
        const tree: {} = getTree({ ...props, render: props.render });

        // Patch the previous tree with the current tree, specifying the root element, which is the custom component.
        const root: HTMLElement = patch(previousProps.tree, tree, previousProps.root);

        // Insert the DOM representation into the shadow boundary if it's the first render of the component.
        !('tree' in previousProps) && props.node.shadowRoot.insertBefore(root, props.node.shadowRoot.firstChild);

        // Save the virtual DOM state for cases where an error short-circuits the chain.
        props.node[vDomState].putVDomState(tree, root);

        return props;

    };

}
