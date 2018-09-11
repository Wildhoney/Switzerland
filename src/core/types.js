/**
 * @function String ∷ String → String
 */
export const String = a => a;

/**
 * @function Int ∷ String → Integer
 */
export const Int = parseInt;

/**
 * @function BigInt ∷ String → BigInt
 */
export const BigInt = window.BigInt;

/**
 * @function Float ∷ String → Float
 */
export const Float = parseFloat;

/**
 * @function Bool ∷ String → Boolean
 */
export const Bool = a => a === '1' || a.toLowerCase() === 'true';

/**
 * @function Date ∷ String → Date
 */
export const Date = a => new Date(Date.parse(a));

/**
 * @function Array ∷ ∀ a b. (a → b) → String → [b]
 */
export const Array = (f = String) => a => a.split(',').map(a => f(a));

/**
 * @function Tuple ∷ ∀ a b. (a → b) → String → [b]
 */
export const Tuple = (...fs) => a =>
    a.split(',').map((a, index) => {
        const f = fs[index];
        return f(a);
    });
