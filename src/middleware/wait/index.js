import { getEventName } from '../../core/utils.js';
import * as u from './utils.js';

/**
 * @function wait ∷ Props p ⇒ [String] → (p → Promise p)
 *  ---
 * Takes a list of node names that correspond to Switzerland defined custom elements. Awaits for them to
 * be mounted in the DOM, including running all of their associated middleware, before resolving the custom element
 * that the 'wait' middleware was defined on.
 *
 * This allows for components to be atomic, in that a parent component cannot be considered resolved until its
 * child components have been resolved. It could potentially be a long chain of component dependencies.
 *
 * It's worth noting that the 'wait' middleware will not await a node that is not in the DOM, therefore it's acceptable
 * to list nodes that may or may not be in the DOM, depending on conditionals.
 */
export default function wait(...names) {
    const eventName = getEventName('resolved');

    return async function wait(props) {
        // Determine which elements we need to await being resolved before we continue.
        const resolved = new Set();

        await new Promise(resolve => {
            // Find all of the nodes to wait upon, minus those that have already been resolved.
            const nodes = u.findApplicableNodes(names, props);

            nodes.length === 0
                ? resolve()
                : u.attachEventListener(eventName, nodes, resolved, resolve);
        });

        return props;
    };
}
