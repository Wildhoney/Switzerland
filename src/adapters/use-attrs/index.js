import { getDefaults } from '../../core/utils.js';
import * as utils from './utils.js';

export const nodes = new WeakSet();

export default function useAttrs({ node, window, server, lifecycle, render }) {
    return (types, exclude = ['class', 'id', 'style', 'data-swiss']) => {
        const defaults = getDefaults(types);

        if (!nodes.has(node) && !server) {
            const observer = new window.MutationObserver(
                (mutations) => utils.hasApplicableMutations(node, mutations, exclude) && render()
            );

            observer.observe(node, {
                attributes: true,
                attributeOldValue: true,
            });

            nodes.add(node);
        }

        lifecycle === 'unmount' && nodes.delete(node);

        return utils.getAttributes(node.attributes, types, defaults);
    };
}
