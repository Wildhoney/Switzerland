import {
    patch,
    h
} from 'https://cdn.jsdelivr.net/npm/superfine@6.0.1/src/index.js';
import * as u from './utils.js';

export { h };

/**
 * @function html ∷ View v, Props p ⇒ (void → v) → (p → p)
 * ---
 * Takes a virtual DOM representation that will render to the node's shadow boundary. For size reasons, Switzerland
 * uses Picodom over VirtualDOM, and as such you can use the Picodom documentation for reference.
 */
export default function html(getView, options = {}) {
    return async props => {
        const boundary = u.createShadowRoot(props, options);

        if (props.node.isConnected) {
            const view = await getView(props);

            if (view) {
                const tree = patch(
                    u.takeTree(props.node),
                    u.parseView(view),
                    boundary
                );
                u.putTree(props.node, tree);
            }
        }

        return { ...props, boundary };
    };
}
