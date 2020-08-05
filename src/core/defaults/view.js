import { createVNode as h } from '../renderer/utils.js';

/**
 * @function defaultView
 * ---
 * Default view rendering the node name using the monospace font family.
 */
export default function defaultView({ node }) {
    return h('code', { style: 'font-family: monospace' }, `<${node.nodeName.toLowerCase()} />`);
}
