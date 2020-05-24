import { Types, Attributes } from './';

type Transform = { fromKebab: () => string; fromSnake: () => string };

export function getDefaults(types: Types): Attributes {
    return Object.entries(types).reduce(
        (accum, [key, value]) =>
            Array.isArray(value) && typeof value[1] !== 'undefined'
                ? { ...accum, [key]: value[1] }
                : accum,
        {}
    );
}

export function getAttributes(attrs: NamedNodeMap, types: Types, defaults: Attributes): Attributes {
    return Object.values(attrs).reduce((attrs, attr) => {
        const name = toCamelcase(attr.nodeName).fromKebab();
        const [f] = [].concat(types[name] || ((a) => a));

        return {
            ...attrs,
            [name]: f(attr.nodeValue),
        };
    }, defaults);
}

export function toCamelcase(value: string): Transform {
    const f = (separator) => () => {
        const r = new RegExp(`(${separator}\\w)`, 'g');
        return value.replace(r, (match) => match[1].toUpperCase());
    };

    return {
        fromKebab: f('-'),
        fromSnake: f('_'),
    };
}
