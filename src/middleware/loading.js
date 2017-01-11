import { diff, patch } from 'virtual-dom';

/**
 * @param {Function} html
 * @return {Function}
 */
export default html => {

    return props => {

        const { tree: currentTree, root: currentRoot, props: prevProps } = props.prevProps;
        const patchTree = props.tree || currentTree;
        const patchRoot = props.root || currentRoot;

        if (prevProps) {

            const tree = html({ ...prevProps, loading: true });
            const patches = diff(patchTree, tree);
            const root = patch(patchRoot, patches);

            return { ...props, root, tree };

        }

        return props;

    };

};
