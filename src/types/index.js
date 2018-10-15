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
export const BigInt = a => window.BigInt(a);

/**
 * @function Float ∷ String → Float
 */
export const Float = a => parseFloat(a);

/**
 * @function Float.DP ∷ Integer → String → Float
 */
Float.DP = dp => a => Number(parseFloat(a).toFixed(dp));

/**
 * @function Bool ∷ String → Boolean
 */
export const Bool = a => a === '1' || a.toLowerCase() === 'true';

/**
 * @function Date ∷ String → Date
 */
export const Date = a => new window.Date(window.Date.parse(a));

/**
 * @function Array ∷ ∀ a. (String → a) → String → [a]
 */
export const Array = (f = String) => a => a.split(',').map(a => f(a));

/**
 * @function Tuple ∷ ∀ a. [(String → a)] → String → [a]
 */
export const Tuple = (...fs) => a =>
    a.split(',').map((a, index) => {
        const f = fs[index] || String;
        return f(a);
    });
