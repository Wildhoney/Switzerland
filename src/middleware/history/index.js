import { getDefaults } from '../../core/utils.js';
import * as u from './utils.js';

export const nodes = new Set();

[u.eventName, 'popstate', 'hashchange'].forEach(eventName =>
    window.addEventListener(eventName, () =>
        nodes.forEach(node => node.render())
    )
);

/**
 * @function history ∷ ∀ a b. Props p ⇒ Object(String: a) → Object(String: b) → (p → p)
 * ---
 * Observes and re-renders whenever the route has been updated. Passes the parsed props that can be
 * set by passing the params and their associated types. Useful for whenever you're managing state by
 * using the browser's URL params.
 */
export default function history(types = {}, location = window.location) {
    const defaults = getDefaults(types);

    return props => {
        const { node } = props;
        !nodes.has(node) && nodes.add(node);

        const params = new URLSearchParams(location.search);
        const get = params.get.bind(params);
        params.get = u.createPatch(get, types, defaults);

        return {
            ...props,
            history: {
                hash: location.hash,
                params,
                push: u.changeState(props, 'pushState'),
                replace: u.changeState(props, 'replaceState')
            }
        };
    };
}
