import {
    patch,
    h
} from 'https://cdn.jsdelivr.net/npm/superfine@6.0.1/src/index.js';
import { createShadowRoot } from '../../core/utils.js';
import * as u from './utils.js';

// Extend the `h` object with useful functions.
const extendedH = h;
extendedH.vars = u.vars;
extendedH.sheet = u.sheet;

const boundaryForms = new WeakMap();

/**
 * @function html ∷ View v, Props p ⇒ (p → v) → (p → p)
 * ---
 * Takes a virtual DOM representation that will render to the node's shadow boundary. For size reasons, Switzerland
 * uses Picodom over VirtualDOM, and as such you can use the Picodom documentation for reference.
 */
export default function html(getView, options = {}) {
    return async props => {
        const { lifecycle, utils, node } = props;
        const boundary = createShadowRoot(node, options);

        if (props.node.isConnected) {
            const isMounting = lifecycle === 'mount';

            return (async function render(pass, { forms = [] }) {
                // Define the new props and assign to `props` so it's infinitely nested.
                const newProps = {
                    ...props,
                    boundary,
                    h: extendedH,
                    utils: {
                        ...utils,
                        form: { ...utils.form, ...u.parseForms(forms) }
                    }
                };
                newProps.props = newProps;

                const view = await getView(newProps);
                const tree = patch(u.takeTree(node), view, boundary);
                u.putTree(node, tree);

                if (isMounting && u.isFirst(pass) && u.treeContainsForm(view)) {
                    boundaryForms.set(
                        boundary,
                        boundary.querySelectorAll('form')
                    );
                    return render(pass + 1, {
                        forms: boundaryForms.get(boundary)
                    });
                }

                return newProps;
            })(1, { forms: boundaryForms.get(boundary) });
        }

        return { ...props, boundary };
    };
}
