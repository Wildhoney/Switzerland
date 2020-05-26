import { getBoundary } from '../../core/utils.js';

/**
 * @function findApplicableNodes ∷ String → Props → [HTMLElement]
 */
export const findApplicableNodes = (names, props) => {
    return [
        ...names.reduce(
            (accum, name) => [
                ...accum,
                ...Array.from(getBoundary(props.node).querySelectorAll(name)),
            ],
            []
        ),
    ].filter((node) => !node.classList.contains('resolved'));
};

/**
 * @function attachEventListener ∷ String → [HTMLElement] → Set → (void → void) → void
 */
export const attachEventListener = (eventName, nodes, resolved, resolve) => {
    function listener({ detail: { node } }) {
        nodes.includes(node) && resolved.add(node);
        if (resolved.size === nodes.length) {
            document.removeEventListener(eventName, listener);
            resolved.clear();
            resolve();
        }
    }

    document.addEventListener(eventName, listener);
};
