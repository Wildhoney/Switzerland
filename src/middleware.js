import { patch } from 'picodom';
import { state } from './switzerland';

type Props = {} => {};

/**
 * @constant errorHandlers
 * @type {WeakMap}
 */
export const errorHandlers: WeakMap<Symbol, Function> = new WeakMap();

/**
 * @type TreeRoot
 */
export type TreeRoot = { tree: {}, root: HTMLElement, props: {} };

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

    return async props => {

        const isInitial: boolean = !props.node.shadowRoot.firstChild;
        const previous: TreeRoot = props.node[state].takeVDomTree() || {};
        const tree: {} = await getTree({ ...props, render: props.render });

        // Patch the previous tree with the current tree, specifying the root element, which is the custom component.
        const root: HTMLElement = patch(previous.tree, tree, previous.root);

        // Insert the DOM representation into the shadow boundary if it's the first render of the component.
        !previous.tree && props.node.shadowRoot.insertBefore(root, props.node.shadowRoot.firstChild);

        // Save the virtual DOM state for cases where an error short-circuits the chain.
        props.node[state].putState(tree, root, props);

        return props;

    };

}
