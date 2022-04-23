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
