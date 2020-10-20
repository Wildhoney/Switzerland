import * as node from './core/renderer/nodes.js';
import { checkFormValidity } from './utils.js';

export { create, render, renderToStream, preload, rename, fetch } from './core/index.js';

export { createVNode as h } from './core/renderer/utils.js';

export * as type from './types/index.js';

export const utils = { node, checkFormValidity };
