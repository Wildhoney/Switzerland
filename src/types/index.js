export function String(a) {
    return a;
}

export function Int(a) {
    const value = parseInt(a);
    return Number.isNaN(value) ? null : value;
}

export function BigInt(a) {
    try {
        return window.BigInt(a);
    } catch {
        return null;
    }
}

export function Float(a) {
    const value = parseFloat(a);
    return Number.isNaN(value) ? null : value;
}

Float.DP = (dp) => (a) => {
    const value = Float(a);
    return value === null ? null : Float(value.toFixed(dp));
};

export const Bool = (a, [truthies, falsies] = [[], []]) => {
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

export function Date(a) {
    const value = new window.Date(window.Date.parse(a));
    return Number.isNaN(value.getTime()) ? null : value;
}

export function Array(f = String) {
    return (a) => a.split(',').map((a) => f(a));
}

export function Tuple(...fs) {
    return (a) =>
        a.split(',').map((a, index) => {
            const f = fs[index] || String;
            return f(a);
        });
}

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
