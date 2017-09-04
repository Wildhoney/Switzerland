/**
 * @method kebabToCamel
 * @param {String} value
 * @return {String}
 */
export function kebabToCamel(value: string): string {
    return value.replace(/(-\w)/g, match => match[1].toUpperCase());
}
