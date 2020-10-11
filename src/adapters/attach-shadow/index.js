import { createVNode } from '../../core/renderer/utils.js';
import * as utils from './utils.js';

export const boundaries = new WeakMap();

/**
 * @function attachShadow
 * ---
 * Attaches a shadow boundary to the node using the passed options such as delegating focus and adopted
 * stylesheets. Yields the boundary for the client, and the create boundary function on the server which
 * allows for the server to attach the shadow boundary during the rendering of the tree.
 */
export default function attachShadow({ node, server, lifecycle }) {
    return (options) => {
        if (lifecycle !== 'mount') return;

        if (server) {
            const createBoundary = (tree) =>
                createVNode('swiss-template', { shadowroot: options?.mode ?? 'open' }, tree);
            boundaries.set(node, createBoundary);
            return createBoundary;
        }

        const boundary = utils.attachBoundary(node, options);
        boundaries.set(node, boundary);
        return boundary;
    };
}
