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
    const defaults = Object.entries(types).reduce(
        (accum, [key, value]) =>
            Array.isArray(value) && typeof value[1] !== 'undefined' ? { ...accum, [key]: value[1] } : accum,
        {}
    );

    return props => {
        if (!observers.has(props.node)) {
            const observer = new window.MutationObserver(mutations => {
                mutations.some(mutation => {
                    // Only cause a re-render if some of the mutated items have actually changed the attribute
                    // when compared, and are not included in the `exclude` list specified in the function's
                    // parameters.
                    const isObserved = !exclude.includes(mutation.attributeName);
                    const isModified = mutation.oldValue !== props.node.getAttribute(mutation.attributeName);
                    return isObserved && isModified;
                }) && props.render();
            });

            observer.observe(props.node, {
                attributes: true,
                attributeOldValue: true
            });
            observers.set(props.node, observer);
        }

        const attrs = Object.values(props.node.attributes).reduce((acc, attr) => {
            const name = u.kebabToCamel(attr.nodeName);
            const [f] = [].concat(types[name] || (a => a));

            return {
                ...acc,
                [name]: f(attr.nodeValue)
            };
        }, defaults);

        return { ...props, attrs };
    };
}
