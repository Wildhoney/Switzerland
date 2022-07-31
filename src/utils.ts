import type { DispatchEventOptions, DispatchEventPayload, FromCamelcase, ToCamelcase } from './types';

export const getAttributes = (attrs: NamedNodeMap): Record<string, string> =>
    Object.values(attrs).reduce((attrs, attr) => {
        const name = toCamelcase(attr.nodeName).fromKebab();

        return {
            ...attrs,
            [name]: attr.nodeValue,
        };
    }, {});

export function hasApplicableMutations(node: HTMLElement, mutations: MutationRecord[]): boolean {
    return mutations.some((mutation) => {
        const { attributeName, oldValue } = mutation;
        return attributeName ? oldValue !== node.getAttribute(attributeName) : false;
    });
}

export const dispatchEvent =
    (node: HTMLElement) =>
    (name: string, payload: DispatchEventPayload, options: DispatchEventOptions = {}): boolean => {
        const model = typeof payload === 'object' ? payload : { value: payload };

        return node.dispatchEvent(
            new window.CustomEvent(name, {
                bubbles: true,
                composed: true,
                ...options,
                detail: { ...model, version: 6 },
            })
        );
    };

export function toCamelcase(value: string): ToCamelcase {
    const f = (separator: string) => (): string => {
        const r = new RegExp(`(${separator}\\w)`, 'g');
        return value.replace(r, (match) => match[1].toUpperCase());
    };

    return {
        fromKebab: f('-'),
        fromSnake: f('_'),
    };
}

export function fromCamelcase(value: string): FromCamelcase {
    const f = (separator: string) => (): string => {
        return value.replace(/([A-Z])/g, `${separator}$1`).toLowerCase();
    };

    return {
        toKebab: f('-'),
        toSnake: f('_'),
    };
}

export function stripTrailingSlashes(value: null | string): null | string {
    return value?.replace(/(\/)*$/g, '') ?? null;
}
