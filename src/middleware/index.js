export function load(name) {
    return async (...args) => {
        const module = await import(`./${name}/index.js`);
        return module.default(...args);
    };
}

export const attrs = load('attrs');
export const boundary = load('boundary');
export const delay = load('delay');
export const html = load('html');
export const loader = load('loader');
export const methods = load('methods');
export const path = load('path');
export const rescue = load('rescue');
export const state = load('state');
export const wait = load('wait');
export const window = load('window');
