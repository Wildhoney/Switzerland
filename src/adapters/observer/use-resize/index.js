import * as utils from './utils.js';

const nodes = new WeakSet();

const state = new WeakMap();

const observer =
    typeof window !== 'undefined' &&
    'ResizeObserver' in window &&
    new window.ResizeObserver((entries) =>
        entries.forEach(function useResize(entry) {
            state.set(entry.target, entry.contentRect);
            entry.target.render();
        })
    );

/**
 * @function useResize
 * ---
 * Hooks up the host node to the `ResizeObserver` observer which allows for element queries where components are
 * re-rendered whenever their dimensions change, rather than when the page's dimension changes. This allows for
 * responsiveness on an element-level, where for example an element is placed in a 200px space it can render
 * differently than when it's placed in a 400px space.
 */
export default function useResize({ node, lifecycle, server }) {
    return ({ getWidth = utils.getContainerSize, getHeight = utils.getContainerSize } = {}) => {
        if (server) return null;

        switch (lifecycle) {
            case 'mount':
                nodes.add(node);
                observer.observe(node);
                break;

            case 'unmount':
                nodes.delete(node);
                observer.unobserve(node);
                break;
        }

        // A futile attempt at automated container queries.
        const dimensions = state.get(node) ?? null;
        node.dataset.width = getWidth(dimensions?.width ?? node.getBoundingClientRect().width);
        node.dataset.height = getHeight(dimensions?.height ?? node.getBoundingClientRect().height);

        return dimensions;
    };
}
