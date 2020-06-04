import * as node from './middleware/html/nodes.js';

export { create, render, styles } from './core/index.js';
export { createVNode as h } from './middleware/html/utils.js';
export * as m from './middleware/index.js';
export * as t from './types/index.js';

export const utils = { node };
