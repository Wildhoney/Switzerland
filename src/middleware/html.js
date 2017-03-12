import create from 'virtual-dom/create-element';
import patch from 'virtual-dom/patch';
import diff from 'virtual-dom/diff';
import { coreKey } from '../helpers/keys';

/**
 * @param {Function} html
 * @return {Function}
 */
export default html => {

    return props => {

        const tree = html(props);
        const boundary = props.node.shadowRoot;

        const root = 'root' in props[coreKey] ? (() => {

            if (props.attached) {

                // Diff and patch the current DOM state with the new one.
                const patches = diff(props[coreKey].tree, tree);
                return patch(props[coreKey].root, patches);

            }

            return props;

        })() : create(tree);

        // Insert the node into the DOM.
        props.attached && !props.node.firstChild && boundary.insertBefore(root, boundary.firstChild);

        // Save the virtual DOM state for cases where an error short-circuits the chain.
        props[coreKey].writeVDomState(tree, root);

        return { ...props, [coreKey]: { ...props[coreKey], tree, root } };

    };

};
