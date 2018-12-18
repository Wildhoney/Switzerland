/**
 * TODO: Share function with attrs middleware.
 * @function snakeToCamel ∷ String → String
 */
export const snakeToCamel = value => {
    return value.replace(/(_\w)/g, match => match[1].toUpperCase());
};
