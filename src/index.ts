import attrs from './middleware/attrs/index';
import html from './middleware/html/index';

export { default as h } from './core/h';
export { default as render } from './core/render';
export { default as create } from './core/create';
export * as t from './types/index';

export const m = {
    attrs,
    html,
};
