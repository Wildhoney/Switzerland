import * as u from './utils.js';

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
export default function attrs(types = {}, exclude = ['class', 'id', 'style']) {
    const observers = new Map();

    return props => {
        if (!observers.has(props.node)) {
            const observer = new window.MutationObserver(
                mutations =>
                    u.hasApplicableMutations(props.node, mutations, exclude) &&
                    props.render()
            );

            observer.observe(props.node, {
                attributes: true,
                attributeOldValue: true
            });
            observers.set(props.node, observer);
        }

        return {
            ...props,
            attrs: u.transformAttributes(props.node.attributes, types)
        };
    };
}
