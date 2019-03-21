import { findBoundary } from '../../core/utils.js';

/**
 * @function findApplicableNodes ∷ String → Props → [HTMLElement]
 */
export const findApplicableNodes = (names, props) => {
    return [
        ...names.reduce(
            (accum, name) => [
                ...accum,
                ...Array.from(findBoundary(props).querySelectorAll(name))
            ],
            []
        )
    ].filter(node => !node.classList.contains('resolved'));
};

/**
 * @function attachEventListener ∷ String → [HTMLElement] → Set → (void → void) → void
 */
export const attachEventListener = (eventName, nodes, resolved, resolve) =>
    void document.addEventListener(eventName, function listener({
        detail: { node }
    }) {
        nodes.includes(node) && resolved.add(node);
        if (resolved.size === nodes.length) {
            document.removeEventListener(eventName, listener);
            resolve();
            resolved.clear();
        }
    });
