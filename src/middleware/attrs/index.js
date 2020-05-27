import { getDefaults } from '../../core/utils.js';
import * as utils from './utils.js';

export const nodes = new Set();

/**
 * @function attrs
 * ---
 * Takes an optional list of excluded attributes that will be ignored when their values are mutated, such as you
 * may not want the component to re-render when class names are modified, such as the "resolved" class name that
 * Switzerland adds when a component has been resolved.
 *
 * The 'attrs' middleware parses all of the attributes defined on the host node, and augments the passed props with
 * their values. It also observes the attributes using the 'MutationObserver' to re-render the component when any
 * of the non-excluded attributes are modified.
 */
export default (types = {}, exclude = ['class', 'id', 'style', 'data-swiss']) => {
    const defaults = getDefaults(types);

    return function attrs(props) {
        if (props.server) return props;

        if (!nodes.has(props.node) && !props.server) {
            const observer = new MutationObserver(
                (mutations) =>
                    utils.hasApplicableMutations(props.node, mutations, exclude) && props.render()
            );

            observer.observe(props.node, {
                attributes: true,
                attributeOldValue: true,
            });

            nodes.add(props.node);
        }

        props.lifecycle === 'unmount' && nodes.delete(props.node);

        return {
            ...props,
            attrs: utils.getAttributes(props.node.attributes, types, defaults),
        };
    };
};
