import create from 'virtual-dom-webcomponents-patch/create-element';
import patch from 'virtual-dom-webcomponents-patch/patch';
import diff from 'virtual-dom-webcomponents-patch/diff';
import { coreKey } from '../helpers/keys';

/**
 * @param {Function} html
 * @return {Function}
 */
export default html => {

    return props => {

        const tree = html(props);

        const root = 'root' in props[coreKey] ? (() => {

            if (props.attached) {

                // Diff and patch the current DOM state with the new one.
                const patches = diff(props[coreKey].tree, tree);
                return patch(props[coreKey].root, patches);

            }

            return props;

        })() : create(tree);

        // Save the virtual DOM state for cases where an error short-circuits the chain.
        props[coreKey].saveVDomState(tree, root);

        return { ...props, [coreKey]: { ...props[coreKey], tree, root } };

    };

};
