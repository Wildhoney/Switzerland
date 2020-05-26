import superfine from 'superfine';
import { findBoundary } from '../../core/utils.js';
import * as u from './utils.js';

/**
 * @function html ∷ ∀ a. View v, Props p ⇒ (p → v) → (p → p) → Object String a
 * ---
 * Takes a virtual DOM representation that will render to the node's shadow boundary. For size reasons, Switzerland
 * uses Picodom over VirtualDOM, and as such you can use the Picodom documentation for reference.
 */
export default function html(getView, options = { recycle: false }) {
    return async function html(props) {
        const { node, utils } = props;

        // Remove any previous style resolutions.
        u.styles.has(node) && u.styles.delete(node);

        // Extend the `h` object with useful functions.
        const extendedH = superfine.h;
        extendedH.vars = u.vars;
        extendedH.sheet = u.sheet(node);

        // Define the new props and assign to `props` so it's infinitely nested.
        const newProps = {
            ...props,
            h: extendedH,
        };
        newProps.props = newProps;

        const view = await getView(newProps);

        if (options.recycle && !u.takeTree(node)) {
            // Recycle the node if the node's content is empty.
            node.shadowRoot && node.shadowRoot.appendChild(node.firstChild);
            u.putTree(node, superfine.recycle(findBoundary(props)));
        }

        if (utils.isHeadless) {
            const tree = superfine.h('templatey', { shadowroot: 'open' }, [view]);
            props.node.appendChild(await u.renderToDOM(tree));
            u.putTree(node, tree);
        }

        if (props.node.isConnected) {
            const boundary = node.shadowRoot || node.attachShadow({ mode: 'open' });
            const tree = superfine.patch(u.takeTree(node), view, boundary);
            u.putTree(node, tree);
        }

        return props;
    };
}
