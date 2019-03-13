import * as u from '../../core/utils.js';

/**
 * @function boundary ∷ ∀ a. Props p ⇒ Object String a → (p → p)
 * ---
 * Creates a shadow boundary with the supplied options, such as whether the boundary is
 * open, delegates focus, and also the chance to include adopted stylesheets.
 */
export default function boundary(options) {
    return props => {
        const { node } = props;
        const boundary = u.createBoundary(node, options);
        return { ...props, boundary };
    };
}
