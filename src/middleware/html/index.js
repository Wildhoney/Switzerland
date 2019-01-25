import { patch, h } from '../../core/superfine.js';
import { createShadowRoot } from '../../core/utils.js';
import * as u from './utils.js';

// Extend the `h` object with useful functions.
const extendedH = h;
extendedH.vars = u.vars;
extendedH.sheet = u.sheet;

/**
 * @function html ∷ View v, Props p ⇒ (p → v) → (p → p)
 * ---
 * Takes a virtual DOM representation that will render to the node's shadow boundary. For size reasons, Switzerland
 * uses Picodom over VirtualDOM, and as such you can use the Picodom documentation for reference.
 */
export default function html(getView, options = {}) {
    return async props => {
        const { node } = props;
        const boundary = createShadowRoot(node, options);

        if (props.node.isConnected) {
            // Attach `h` to the current set of props, and all of its infinitely nested `props` where
            // the `props` haven't been shallowly copied.
            props.props.h = extendedH;

            const view = await getView({ ...props, h: extendedH });

            if (view) {
                const tree = patch(u.takeTree(node), view, boundary);
                u.putTree(node, tree);
            }
        }

        return { ...props, boundary };
    };
}
