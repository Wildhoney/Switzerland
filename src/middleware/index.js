export function load(name) {
    return async (...args) => {
        const module = await import(`./${name}/index.js`);
        return module.default(...args);
    };
}

export const attrs = load('attrs');
export const blend = load('blend');
export const boundary = load('boundary');
export const delay = load('delay');
export const form = load('form');
export const history = load('history');
export const html = load('html');
export const interval = load('interval');
export const loader = load('loader');
export const methods = load('methods');
export const path = load('path');
export const redux = load('redux');
export const rename = load('rename');
export const rescue = load('rescue');
export const run = load('run');
export const state = load('state');
export const window = load('window');
