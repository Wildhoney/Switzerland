import { createVNode } from '../../../renderer/utils.js';
import * as utils from './utils.js';

export const boundaries = new WeakMap();

export default function attachShadow({ node, server, lifecycle }) {
    return (options) => {
        if (lifecycle !== 'mount') return;

        if (server) {
            const createBoundary = (tree) =>
                createVNode('x-template', { shadowroot: 'open' }, tree);
            boundaries.set(node, createBoundary);
            return createBoundary;
        }

        const boundary = utils.attachBoundary(node, options);
        boundaries.set(node, boundary);
        return boundary;
    };
}
