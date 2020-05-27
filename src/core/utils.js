import { getWindow } from '../utils.js';

export function getRandomId() {
    const a = new Uint32Array(1);
    window.crypto.getRandomValues(a);
    return a[0].toString(16);
}

export function parseTagName(name) {
    const [tag, prototype] = name.split('/');
    const extend = prototype ?? null;
    return [getAvailableTagName(tag), determinePrototype(prototype), extend];
}

export function getAvailableTagName(name, suffix = null) {
    if (typeof window === 'undefined') return name;
    const tag = suffix ? `${name}-${suffix}` : name;
    return !window.customElements.get(tag) ? tag : getAvailableTagName(tag, getRandomId());
}

export function determinePrototype(name) {
    const window = getWindow();
    return name ? document.createElement(name).constructor : window.HTMLElement;
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
