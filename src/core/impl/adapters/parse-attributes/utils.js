import { toCamelcase } from '../../../utils.js';

export const getAttributes = (attrs, types, defaults) =>
    Object.values(attrs).reduce((acc, attr) => {
        const name = toCamelcase(attr.nodeName).fromKebab();
        const [f] = [].concat(types[name] || ((a) => a));

        return {
            ...acc,
            [name]: f(attr.nodeValue),
        };
    }, defaults);

/**
 * @function hasApplicableMutations
 * ---
 * Only cause a re-render if some of the mutated items have actually changed the attribute when compared, and
 * are not included in the `exclude` list specified in the function's parameters.
 */
export const hasApplicableMutations = (node, mutations, exclude = []) =>
    mutations.some((mutation) => {
        const isObserved = !exclude.includes(mutation.attributeName);
        const isModified = mutation.oldValue !== node.getAttribute(mutation.attributeName);
        return isObserved && isModified;
    });
