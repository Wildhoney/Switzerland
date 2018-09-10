/**
 * @function number ∷ String → Number
 */
export const number = Number;

/**
 * @function boolean ∷ String → Boolean
 */
export const boolean = a => a === '1' || a.toLowerCase() === 'true';

/**
 * @function date ∷ String → Date
 */
export const date = a => new Date(Date.parse(a));
