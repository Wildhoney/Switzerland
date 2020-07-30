import * as node from './core/renderer/nodes.js';
import { newRedux } from './core/impl/adapters/bind-redux/index.js';

export { create, render, preload } from './core/index.js';
export { createVNode as h } from './core/renderer/utils.js';
export * as t from './types/index.js';

export const utils = { node, redux: { create: newRedux } };
