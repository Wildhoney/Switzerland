import * as hyper from 'https://cdn.jsdelivr.net/npm/hyperhtml@2.17.1/esm/index.js';
import { findBoundary } from '../../core/utils.js';

/**
 * @function template ∷ Template t, Props p ⇒ (p → t) → (p → p)
 */
export default getView => {
    return async function template(props) {
        if (props.node.isConnected) {
            const h = hyper.default(findBoundary(props));

            // Attach `h` to the current set of props, and all of its infinitely nested `props` where
            // the `props` haven't been shallowly copied.
            props.props.h = h;
            await getView({ ...props, h });
        }

        return props;
    };
};
