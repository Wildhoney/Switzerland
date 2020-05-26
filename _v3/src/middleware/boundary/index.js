import * as u from './utils.js';

/**
 * @function boundary ∷ ∀ a. Props p ⇒ Object String a → (p → p)
 * ---
 * Creates a shadow boundary with the supplied options, such as whether the boundary is
 * open, delegates focus, and also the chance to include adopted stylesheets.
 */
export default (options) => {
    return function boundary(props) {
        const { node, utils } = props;

        if (utils.isHeadless) {
            return { ...props, boundary: null };
        }

        const boundary = u.createBoundary(node, options);
        return { ...props, boundary };
    };
};
