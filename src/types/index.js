/**
 * @function string ∷ String → String
 */
export const string = a => a;

/**
 * @function int ∷ String → Integer
 */
export const int = a => {
    const value = parseInt(a);
    return Number.isNaN(value) ? null : value;
};

/**
 * @function bigInt ∷ String → BigInt
 */
export const bigInt = a => {
    try {
        return BigInt(a);
    } catch (err) {
        return null;
    }
};

/**
 * @function float ∷ String → Float
 */
export const float = a => {
    const value = parseFloat(a);
    return Number.isNaN(value) ? null : value;
};

/**
 * @function float.dp ∷ Integer → String → Float
 */
float.dp = dp => a => {
    const value = float(a);
    return value === null ? null : float(value.toFixed(dp));
};

/**
 * @function bool ∷ String → Boolean
 */
export const bool = type => {
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
 * @function date ∷ String → Date
 */
export const date = a => {
    const value = new Date(Date.parse(a));
    return Number.isNaN(value.getTime()) ? null : value;
};

/**
 * @function array ∷ ∀ a. (String → a) → String → [a]
 */
export const array = (f = string) => a => a.split(',').map(a => f(a));

/**
 * @function tuple ∷ ∀ a. [(String → a)] → String → [a]
 */
export const tuple = (...fs) => a =>
    a.split(',').map((a, index) => {
        const f = fs[index] || string;
        return f(a);
    });

/**
 * @function regex ∷ ∀ a. RegExp r ⇒ r → String → (String → String → a) → Object String a|void
 */
export const regex = (expression, f = string) => a => {
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
