import { getDefaults } from '../../core/utils.js';
import * as utils from './utils.js';

export const nodes = new WeakSet();

/**
 * @function attributes
 * ---
 * Parses the attributes attached to the current node and parsers them based on the `types` that have
 * been supplied, with an optional parameter for excluding attributes. Each non-excluded attribute is
 * watched and if changed the component is automatically re-rendering using the new set of attributes.
 */
export default function attributes({ node, window, server, lifecycle, render }) {
    return (types = {}, exclude = ['class', 'id', 'style', 'data-swiss', 'data-width', 'data-height']) => {
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
