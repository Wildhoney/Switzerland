import {
    patch,
    h
} from 'https://cdn.jsdelivr.net/npm/superfine@6.0.1/src/index.js';
import * as u from './utils.js';

/**
 * @function html ∷ View v, Props p ⇒ (p → v) → (p → p)
 * ---
 * Takes a virtual DOM representation that will render to the node's shadow boundary. For size reasons, Switzerland
 * uses Picodom over VirtualDOM, and as such you can use the Picodom documentation for reference.
 */
export default function html(getView) {
    return async props => {
        const { node, boundary } = props;

        // Remove any previous style resolutions.
        u.styles.has(node) && u.styles.delete(node);

        // Extend the `h` object with useful functions.
        const extendedH = h;
        extendedH.vars = u.vars;
        extendedH.sheet = u.sheet(node);

        if (props.node.isConnected) {
            // Define the new props and assign to `props` so it's infinitely nested.
            const newProps = {
                ...props,
                h: extendedH
            };
            newProps.props = newProps;

            const view = await getView(newProps);
            const tree = patch(u.takeTree(node), view, boundary || node);
            u.putTree(node, tree);
        }

        return props;
    };
}
