/**
 * @function String ∷ String → String
 */
export const String = a => a;

/**
 * @function Int ∷ String → Integer
 */
export const Int = a => {
    const value = parseInt(a);
    return Number.isNaN(value) ? null : value;
};

/**
 * @function BigInt ∷ String → BigInt
 */
export const BigInt = a => {
    try {
        return window.BigInt(a);
    } catch (_) {
        return null;
    }
};

/**
 * @function Float ∷ String → Float
 */
export const Float = a => {
    const value = parseFloat(a);
    return Number.isNaN(value) ? null : value;
};

/**
 * @function Float.DP ∷ Integer → String → Float
 */
Float.DP = dp => a => {
    const value = Float(a);
    return value === null ? null : Float(value.toFixed(dp));
};

/**
 * @function Bool ∷ String → Boolean
 */
export const Bool = type => {
    switch (type.toLowerCase()) {
        case '1':
        case 'true':
        case 'on':
        case 'yes':
            return true;
        case '0':
        case 'false':
        case 'off':
        case 'no':
            return false;
    }
    return null;
};

/**
 * @function Date ∷ String → Date
 */
export const Date = a => {
    const value = new window.Date(window.Date.parse(a));
    return Number.isNaN(value.getTime()) ? null : value;
};

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

/**
 * @function Regex ∷ ∀ a. RegExp r ⇒ r → String → (String → String → a) → Object String a|void
 */
export const Regex = (expression, f = String) => a => {
    const captureGroups = [];
    const namedGroups = expression.toString().matchAll(/\?<(.+?)>/gi);
    for (const group of namedGroups) {
        captureGroups.push(group[1]);
    }
    const match = a.match(expression);
    return captureGroups.reduce(
        (model, key) => ({
            ...model,
            [key]: model[key] ? f(model[key], key) : null
        }),
        match ? match.groups : {}
    );
};
