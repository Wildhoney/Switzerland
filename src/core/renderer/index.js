import morph from 'morphdom';
import * as utils from './utils.js';
import { dispatchEvent } from '../../core/impl/utils.js';
import { boundaries } from '../../core/impl/adapters/attach-shadow/index.js';

const cache = new WeakMap();

export async function renderTree({ tree, node, server }) {
    const boundary = boundaries.get(node) ?? node;

    if (server) {
        const nodes = await utils.getVNodeDOM(typeof boundary === 'function' ? boundary(tree) : tree);
        const fragment = await utils.getVNodeFragment(nodes);
        node.appendChild(fragment);
        return node.shadowRoot;
    }

    const nodes = await utils.getVNodeDOM(tree);
    const fragment = await utils.getVNodeFragment(nodes);

    morph(boundary, fragment, {
        childrenOnly: boundary != null,

        getNodeKey(node) {
            if (!(node instanceof HTMLElement)) return null;
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
            const isSwiss = from instanceof HTMLElement && 'swiss' in from.dataset;

            if (isSwiss) {
                // We only update the attributes of Swiss components, as each component is self-contained.
                Object.values(from.attributes).forEach((attr) => from.removeAttribute(attr.nodeName));
                Object.values(to.attributes).forEach((attr) => from.setAttribute(attr.nodeName, attr.nodeValue));
            }

            typeof to.attachEventListeners === 'function' && to.attachEventListeners(from);
            return isSwiss ? false : to;
        },
    });

    return node.shadowRoot;
}

function toMap(forms) {
    return forms.reduce((forms, form) => ({ ...forms, [form.getAttribute('name') ?? 'default']: form }), {});
}

export function getForms(node) {
    return toMap([...(cache.get(node) ?? [])]);
}

export function renderForms(node) {
    //  Gather all of the rendered forms so we can re-render on first mount.
    const forms = [...(node.shadowRoot ?? node).querySelectorAll('form')];

    // Set the cache for the node which will memorise the forms seen.
    !cache.has(node) && cache.set(node, new Set());

    // Don't continue if we've seen every discovered form previously.
    if (forms.every((form) => cache.get(node).has(form))) return {};

    // Add all of the discovered forms to the cache.
    for (const form of forms) cache.get(node).add(form);

    return toMap(forms);
}
