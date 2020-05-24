import { getWindow } from '../middleware/html/utils';

declare global {
    interface String {
        matchAll: (RegExp) => Iterable<[any, string]>;
    }
}

export function String(a: string): string {
    return a;
}

export function Int(a: string): number {
    const value = parseInt(a);
    return Number.isNaN(value) ? null : value;
}

export function BigInt(a: string): bigint | null {
    const window = getWindow();

    try {
        return window.BigInt(a);
    } catch {
        return null;
    }
}

export function Float(a: string): number | null {
    const value = parseFloat(a);
    return Number.isNaN(value) ? null : value;
}

Float.DP = (dp: number) => (a: string): number | null => {
    const value = Float(a);
    return value === null ? null : Float(value.toFixed(dp));
};

export const Bool = (a: string): boolean | null => {
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

export function Date(a: string): Date {
    const window = getWindow();
    const value = new window.Date(window.Date.parse(a));
    return Number.isNaN(value.getTime()) ? null : value;
}

export function Array<A>(f: (string) => A) {
    return (a: string): A[] => a.split(',').map((a) => f(a));
}

export function Tuple(...fs: ((string) => any)[]) {
    return (a: string): any[] =>
        a.split(',').map((a, index) => {
            const f = fs[index] || String;
            return f(a);
        });
}

export function Regex(expression: RegExp) {
    return (a: string): { [key: string]: string } => {
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
