/**
 * @function kebabToCamel ∷ String → String
 */
const kebabToCamel = value => {
    return value.replace(/(-\w)/g, match => match[1].toUpperCase());
};

/**
 * @function getDefaults ∷ ∀ a. Object String (String → a)
 */
export const getDefaults = types =>
    Object.entries(types).reduce(
        (accum, [key, value]) =>
            Array.isArray(value) && typeof value[1] !== 'undefined'
                ? { ...accum, [key]: value[1] }
                : accum,
        {}
    );

/**
 * @function transformAttributes ∷ ∀ a b c. NamedNodeMap mnm, Object o ⇒ mnm -> o String a -> o String (String → b) -> o (String → c)
 */
export const transformAttributes = (attrs, defaults, types) =>
    Object.values(attrs).reduce((acc, attr) => {
        const name = kebabToCamel(attr.nodeName);
        const [f] = [].concat(types[name] || (a => a));

        return {
            ...acc,
            [name]: f(attr.nodeValue)
        };
    }, defaults);

/**
 * @function hasApplicableMutations ∷ HTMLElement e, MutationRecord mr ⇒ e -> mr -> [String] -> Boolean
 * ---
 * Only cause a re-render if some of the mutated items have actually changed the attribute when compared, and
 * are not included in the `exclude` list specified in the function's parameters.
 */
export const hasApplicableMutations = (node, mutations, exclude) =>
    mutations.some(mutation => {
        const isObserved = !exclude.includes(mutation.attributeName);
        const isModified =
            mutation.oldValue !== node.getAttribute(mutation.attributeName);
        return isObserved && isModified;
    });
