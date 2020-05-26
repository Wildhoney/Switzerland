import morphdom from 'morphdom';
import * as u from './utils.js';
import { meta } from '../../core/utils.js';

/**
 * @function html ∷ ∀ a. View v, Props p ⇒ (p → v) → (p → p) → Object String a
 * ---
 * Takes a virtual DOM representation that will render to the node's shadow boundary. For size reasons, Switzerland
 * uses Picodom over VirtualDOM, and as such you can use the Picodom documentation for reference.
 */
export default function html(getView) {
    return async function html(props) {
        const { node, utils } = props;

        // Remove any previous style resolutions.
        u.styles.has(node) && u.styles.delete(node);

        // Extend the `h` object with useful functions.
        const extendedH = u.h;
        extendedH.vars = u.vars;
        extendedH.sheet = u.sheet(node);

        // Define the new props and assign to `props` so it's infinitely nested.
        const newProps = {
            ...props,
            h: extendedH,
        };
        newProps.props = newProps;

        const view = await getView(newProps);

        if (utils.isHeadless) {
            const tree = u.h('templatey', { shadowroot: 'open' }, [view]);
            props.node.appendChild(await u.renderToDOM(tree));
        }

        if (node.isConnected) {
            const children = await u.renderToDOM(view);
            morphdom(props.boundary, children.outerHTML);
        }

        return props;
    };
}
