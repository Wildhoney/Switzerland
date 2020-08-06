/**
 * @function String
 * ---
 * Identity function that takes a string and yields a string.
 */
export function String(a) {
    return a;
}

/**
 * @function Int
 * ---
 * Transforms a string into an integer, otherwise `null` if invalid.
 */
export function Int(a) {
    const value = parseInt(a);
    return Number.isNaN(value) ? null : value;
}

/**
 * @function BigInt
 * ---
 * Transforms a string into a BigInt, otherwise `null` if invalid.
 */
export function BigInt(a) {
    try {
        return window.BigInt(a);
    } catch {
        return null;
    }
}

/**
 * @function Float
 * ---
 * Transforms a string into a float, otherwise `null` if invalid.
 */
export function Float(a) {
    const value = parseFloat(a);
    return Number.isNaN(value) ? null : value;
}

/**
 * @function Float.DP
 * ---
 * Transforms a string into a float to X decimal places, otherwise `null` if invalid.
 */
Float.DP = (dp) => (a) => {
    const value = Float(a);
    return value === null ? null : Float(value.toFixed(dp));
};

/**
 * @function Bool
 * ---
 * Transforms a string into a boolean using several truthy and falsify values, otherwise `null` if invalid.
 */
export const Bool = (a) => {
    switch (a.toLowerCase()) {
        case '':
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
 * @function Date
 * ---
 * Transforms a string into a date, otherwise `null` if invalid.
 */
export function Date(a) {
    const value = new window.Date(window.Date.parse(a));
    return Number.isNaN(value.getTime()) ? null : value;
}

/**
 * @function Array
 * ---
 * Transforms a string into an array, otherwise an array of `null` values if invalid. Each item
 * in the array must be the same type, otherwise a tuple type should be used.
 */
export function Array(f = String) {
    return (a) => a.split(',').map((a) => f(a));
}

/**
 * @function Tuple
 * ---
 * Transforms a string into a tuple, otherwise a tuple of `null` values if invalid. Unlike the
 * array type, tuple values can have different sub-types for each value, so the tuple could quite
 * easily be composed of a string, integer, float, date all in one list.
 */
export function Tuple(...fs) {
    return (a) =>
        a.split(',').map((a, index) => {
            const f = fs[index] || String;
            return f(a);
        });
}

/**
 * @function Regex
 * ---
 * Transforms a string into a partitioned set of values using a regular expression. For example a
 * regex value of "/(?<day>\d+)-(?<month>\d+)(?:-(?<year>\d+))?/" would parse the string "10-10-1985"
 * into an object of `{ day: '10', month: '10', year: '1985' }`. It's not possible to specify sub-types
 * so another function should take care of the sub-transformations, such as transforming the string
 * parts into integers in the earlier example.
 */
export function Regex(expression) {
    return (a) => {
        const captureGroups = [];
        const namedGroups = expression.toString().matchAll(/\?<(.+?)>/gi);

        for (const group of namedGroups) {
            captureGroups.push(group[1]);
        }

        const match = a.match(expression);

        return captureGroups.reduce(
            (model, key) => ({
                ...model,
                [key]: model[key] ? model[key] : null,
            }),
            match ? match.groups : {}
        );
    };
}
