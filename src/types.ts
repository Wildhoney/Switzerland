import { VNode } from 'preact';

export type Props = {};

export type Tree<Attrs> = (attrs: Attrs) => VNode;

export type RenderOptions = { path: null | string; root: null | string; node: null | HTMLElement };

export type StyleSheetProps = {
    href: string;
    media?: null | string;
};

export type VariablesProps = Record<string, boolean | number | string>;

export function String(a: string): string {
    return a;
}

export function Int(a: string): null | number {
    const value = parseInt(a);
    return Number.isNaN(value) ? null : value;
}

export function BigInt(a: string): null | BigInt {
    try {
        return window.BigInt(a);
    } catch {
        return null;
    }
}

export function Float(a: string): null | number {
    const value = parseFloat(a);
    return Number.isNaN(value) ? null : value;
}

Float.DP =
    (dp: number) =>
    (a: string): null | number => {
        const value = Float(a);
        return value === null ? null : Float(value.toFixed(dp));
    };

export const Bool = (a: string): null | boolean => {
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

export function Date(a: string): null | Date {
    const value = new window.Date(window.Date.parse(a));
    return Number.isNaN(value.getTime()) ? null : value;
}

export function Array(f = String) {
    return (a: string): string[] => a.split(',').map((a) => f(a));
}

export function Tuple(...fs) {
    return (a: string): string[] =>
        a.split(',').map((a, index) => {
            const f = fs[index] || String;
            return f(a);
        });
}

export function Regex(expression: RegExp) {
    return (a: string): Record<string, string> => {
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
