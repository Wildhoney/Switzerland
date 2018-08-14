/**
 * @method kebabToCamel ∷ String → String
 * @param {String} value
 * @return {String}
 */
export const kebabToCamel = value => {
    return value.replace(/(-\w)/g, match => match[1].toUpperCase());
};
