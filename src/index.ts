import attrs from './middleware/attrs';
import html from './middleware/html';

export { default as h } from './core/h';
export { default as render } from './core/render';
export { default as create } from './core/create';
export * as t from './types';

export const m = {
    attrs,
    html,
};
