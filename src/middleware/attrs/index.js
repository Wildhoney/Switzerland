import { getDefaults } from '../../core/utils.js';
import * as u from './utils.js';

/**
 * @constant nodes ∷ Set
 */
export const nodes = new Set();

/**
 * @function attrs ∷ ∀ a b c. Props p ⇒ Object a (b → c) [String] → (p → p)
 * ---
 * Takes an optional list of excluded attributes that will be ignored when their values are mutated, such as you
 * may not want the component to re-render when class names are modified, such as the "resolved" class name that
 * Switzerland adds when a component has been resolved.
 *
 * The 'attrs' middleware parses all of the attributes defined on the host node, and augments the passed props with
 * their values. It also observes the attributes using the 'MutationObserver' to re-render the component when any
 * of the non-excluded attributes are modified.
 */
export default (types = {}, exclude = ['class', 'id', 'style']) => {
    const defaults = getDefaults(types);

    return function attrs(props) {
        const { node, utils, lifecycle, render } = props;

        if (!nodes.has(node)) {
            const observer = new window.MutationObserver(
                (mutations) =>
                    u.hasApplicableMutations(node, mutations, exclude) &&
                    render({
                        signal: {
                            ...(utils.getLatestProps(node) || {}).signal,
                            mutations,
                        },
                    })
            );

            observer.observe(node, {
                attributes: true,
                attributeOldValue: true,
            });
            nodes.add(node);
        }
        lifecycle === 'unmount' && nodes.delete(node);

        return {
            ...props,
            attrs: u.transformAttributes(node.attributes, types, defaults),
        };
    };
};
