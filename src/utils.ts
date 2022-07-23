export const getAttributes = (attrs: NamedNodeMap, types = {}, defaults = {}): Record<string, string> =>
    Object.values(attrs).reduce((acc, attr) => {
        const name = toCamelcase(attr.nodeName).fromKebab();
        const [f] = [].concat(types[name] || ((a) => a));

        return {
            ...acc,
            [name]: f(attr.nodeValue),
        };
    }, defaults);

export function toCamelcase(value) {
    const f = (separator) => () => {
        const r = new RegExp(`(${separator}\\w)`, 'g');
        return value.replace(r, (match) => match[1].toUpperCase());
    };

    return {
        fromKebab: f('-'),
        fromSnake: f('_'),
    };
}

export function fromCamelcase(value) {
    const f = (separator) => () => {
        return value.replace(/([A-Z])/g, `${separator}$1`).toLowerCase();
    };

    return {
        toKebab: f('-'),
        toSnake: f('_'),
    };
}

export function hasApplicableMutations(node, mutations) {
    return mutations.some((mutation) => {
        return mutation.oldValue !== node.getAttribute(mutation.attributeName);
    });
}

export const dispatchEvent =
    (node) =>
    (name, payload, options = {}) => {
        const model = typeof payload === 'object' ? payload : { value: payload };

        return node.dispatchEvent(
            new window.CustomEvent(name, {
                bubbles: true,
                composed: true,
                ...options,
                detail: { ...model, version: 5 },
            })
        );
    };

export function stripTrailingSlashes(value: null | string): null | string {
    return value.replace(/(\/)*$/g, '');
}
