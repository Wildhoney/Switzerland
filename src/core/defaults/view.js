import { createVNode as h } from '../renderer/utils.js';

export default function defaultView({ node, ...props }) {
    return h('code', { style: 'font-family: monospace' }, `<${node.nodeName.toLowerCase()} />`);
}
