/**
 * @function parsename
 * ---
 * Parse the node name, grab the prototype to extend if we're running on the client, and the element
 * it extends if we're extending from an existing native element. For example "x-example" would yield
 * the `HTMLElement` to extend, whereas "x-example/button" would extend from `HTMLButtonElement`.
 */
export function parseName(name) {
    const [tag, prototype] = name.split('/');
    const extend = prototype ?? null;
    return [tag, getPrototype(prototype), extend];
}

/**
 * @function
 * ---
 * Generates a temporary random name for a custom element due to their being a duplicate, which should
 * be later re-named using the `rename` function.
 */
export function getRandonName() {
    return `swiss-${Date.now()}-${Math.round(Math.random() * 100)}`;
}

/**
 * @function getPrototype
 * ---
 * Determine the prototype for any given element name, for example `div` would yield `HTMLElement`, and
 * `button` would yield `HTMLButtonElement`. If we're rendering server-side then this is useless and as
 * such we'll yield `null` in those cases.
 */
export function getPrototype(name) {
    if (typeof window === 'undefined') return null;
    return name ? window.document.createElement(name).constructor : window.HTMLElement;
}

/**
 * @function getDefaults
 * ---
 * Split the optional type parameter tuple into its distinct parts to determine the default values if none
 * is specified.
 */
export function getDefaults(types) {
    return Object.entries(types).reduce(
        (accum, [key, value]) =>
            Array.isArray(value) && typeof value[1] !== 'undefined' ? { ...accum, [key]: value[1] } : accum,
        {}
    );
}

/**
 * @function toCamelCase
 * ---
 * Utility function to transforming to camelcase from kebab and snake.
 */
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

/**
 * @function fromCamelcase
 * ---
 * Utility function to transforming from camelcase to kebab and snake.
 */
export function fromCamelcase(value) {
    const f = (separator) => () => {
        return value.replace(/([A-Z])/g, `${separator}$1`).toLowerCase();
    };
    return {
        toKebab: f('-'),
        toSnake: f('_'),
    };
}

/**
 * @function getEventName
 * ---
 * Simple utility function to get the specialised event name.
 */
export function getEventName(label) {
    return `@switzerland/${label}`;
}
