import * as utils from './utils.js';
import { dispatchEvent } from '../../core/impl/utils.js';
import { boundaries } from '../../adapters/shadow/index.js';
import { runBatchedFunctions } from '../../adapters/run/rendered/index.js';

/**
 * @function renderTree
 * ---
 * Renders the tree that the view yields. On the server-side it renders to string, and client-side via
 * the MorphDOM library. Yields the shadow root or the node if none set.
 */
export async function renderTree({ tree, node, server, options }) {
    try {
        const boundary = boundaries.get(node) ?? node;

        if (server) {
            const nodes = await utils.getVNodeDOM(typeof boundary === 'function' ? boundary(tree) : tree, options);
            const fragment = await utils.getVNodeFragment(nodes);
            node.appendChild(fragment);

            return node.shadowRoot ?? node;
        }

        const morph = await import('morphdom');
        const nodes = await utils.getVNodeDOM(tree);
        const fragment = await utils.getVNodeFragment(nodes);

        morph.default(boundary, fragment, {
            childrenOnly: boundary != null,

            getNodeKey(node) {
                if (!(node instanceof window.HTMLElement)) return null;
                return node.getAttribute('key') ?? null;
            },
            onNodeAdded(node) {
                typeof node.attachEventListeners === 'function' && node.attachEventListeners(node);
                dispatchEvent(node)('create', { node });
            },
            onNodeDiscarded(node) {
                typeof node.detatchEventListeners === 'function' && node.detatchEventListeners(node);
                dispatchEvent(node)('destroy', { node });
            },
            onBeforeElUpdated(from, to) {
                const isSwiss = from instanceof window.HTMLElement && 'swiss' in from.dataset;

                if (isSwiss) {
                    // We only update the attributes of Swiss components, as each component is self-contained.
                    Object.values(from.attributes).forEach((attr) => from.removeAttribute(attr.nodeName));
                    Object.values(to.attributes).forEach((attr) => from.setAttribute(attr.nodeName, attr.nodeValue));
                }

                typeof to.attachEventListeners === 'function' && to.attachEventListeners(from);
                return isSwiss ? false : to;
            },
        });

        return node.shadowRoot ?? node;
    } finally {
        // Run any batched functions from the `run.onRender` adapter.
        runBatchedFunctions(node);
    }
}
