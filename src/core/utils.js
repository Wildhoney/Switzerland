import { getWindow } from '../utils.js';

export function parseName(name) {
    const [tag, prototype] = name.split('/');
    const extend = prototype ?? null;
    return [tag, getPrototype(prototype), extend];
}

export function getPrototype(name) {
    const window = getWindow();
    return name ? window.document.createElement(name).constructor : window.HTMLElement;
}

export function getDefaults(types) {
    return Object.entries(types).reduce(
        (accum, [key, value]) =>
            Array.isArray(value) && typeof value[1] !== 'undefined'
                ? { ...accum, [key]: value[1] }
                : accum,
        {}
    );
}

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

export function getEventName(label) {
    return `@switzerland/${label}`;
}
