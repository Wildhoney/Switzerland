import { diff, patch } from 'virtual-dom';

/**
 * @constant vDomPropsKey
 * @type {Symbol}
 */
export const vDomPropsKey = Symbol('switzerland/vdom-props');

/**
 * @param {Function} html
 * @return {Function}
 */
export default html => {

    return props => {

        const { tree: currentTree, root: currentRoot } = props[vDomPropsKey];

        const patchTree = props.tree || currentTree;
        const patchRoot = props.root || currentRoot;

        if (props.prevProps) {

            const tree = html({ ...props.prevProps, loading: true });
            const patches = diff(patchTree, tree);
            const root = patch(patchRoot, patches);

            return { ...props, [vDomPropsKey]: { root, tree } };

        }

        return props;

    };

};
