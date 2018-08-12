import * as u from './utils';

/**
 * @function attrs ∷ Props p ⇒ [String] → (p → p)
 *
 * Takes an optional list of excluded attributes that will be ignored when their values are mutated, such as you
 * may not want the component to re-render when class names are modified, such as the "resolved" class name that
 * Switzerland adds when a component has been resolved.
 *
 * The 'attrs' middleware parses all of the attributes defined on the host node, and augments the passed props with
 * their values. It also observes the attributes using the 'MutationObserver' to re-render the component when any
 * of the non-excluded attributes are modified.
 */
export default function attrs(exclude = ['class', 'id', 'style']) {
    const observers = new Map();

    return props => {
        if (!observers.has(props.node)) {
            const observer = new MutationObserver(mutations => {
                mutations.some(mutation => {
                    // Only cause a re-render if some of the mutated items have actually changed the attribute
                    // when compared, and are not included in the `exclude` list specified in the function's
                    // parameters.
                    const isObserved = !exclude.includes(
                        mutation.attributeName
                    );
                    const isModified =
                        mutation.oldValue !==
                        props.node.getAttribute(mutation.attributeName);
                    return isObserved && isModified;
                }) && props.render();
            });

            observer.observe(props.node, {
                attributes: true,
                attributeOldValue: true
            });
            observers.set(props.node, observer);
        }

        const attrs = Object.values(props.node.attributes).reduce(
            (acc, attr) => {
                return {
                    ...acc,
                    [u.kebabToCamel(attr.nodeName)]: attr.nodeValue
                };
            },
            {}
        );

        return { ...props, attrs };
    };
}
