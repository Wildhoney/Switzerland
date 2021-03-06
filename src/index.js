import * as node from './core/renderer/nodes.js';
import { getFormValidity } from './utils.js';

export { create, render, preload, rename, fetch } from './core/index.js';

export { createVNode as h } from './core/renderer/utils.js';

export * as type from './types/index.js';

export const utils = { node, getFormValidity };
