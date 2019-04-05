import { getDefaults } from '../../core/utils.js';
import * as u from './utils.js';

/**
 * @function nodes ∷ Map
 */
export const nodes = new Map();

[u.eventName, 'popstate', 'hashchange'].forEach(eventName =>
    window.addEventListener(eventName, () =>
        [...nodes.keys()].forEach(node => {
            const { types, defaults, location, utils } = nodes.get(node);
            node.render({
                signal: {
                    ...utils.getLatestProps(node).signal,
                    params: u.getParams(types, defaults, location),
                    pathname: location.pathname,
                    hash: location.hash
                }
            });
        })
    )
);

/**
 * @function history ∷ ∀ a b. Props p ⇒ Object String a → Object(String: b) → (p → p)
 * ---
 * Observes and re-renders whenever the route has been updated. Passes the parsed props that can be
 * set by passing the params and their associated types. Useful for whenever you're managing state by
 * using the browser's URL params.
 */
export default (types = {}, location = window.location) => {
    const defaults = getDefaults(types);

    return function history(props) {
        const { node, utils, lifecycle } = props;
        !nodes.has(node) &&
            nodes.set(node, { types, defaults, location, utils });
        lifecycle === 'unmount' && nodes.delete(node);

        return {
            ...props,
            history: {
                params: u.getParams(types, defaults, location),
                pushState: u.changeState(props, 'pushState'),
                replaceState: u.changeState(props, 'replaceState')
            }
        };
    };
};
