import { getDefaults } from '../../core/utils.js';
import * as utils from './utils.js';

export const nodes = new Map();

['popstate', 'hashchange'].forEach(
    (eventName) =>
        typeof window !== 'undefined' &&
        window.addEventListener(eventName, () =>
            [...nodes.keys()].forEach((node) => {
                const props = nodes.get(node);

                node.render({
                    history: {
                        params: utils.getParams(props.types, props.defaults, window.location),
                        pathname: window.location.pathname,
                        hash: window.location.hash,
                    },
                });
            })
        )
);

/**
 * @function useHistory
 * ---
 * Observes and re-renders whenever the route has been updated. Passes the parsed props that can be
 * set by passing the params and their associated types. Useful for whenever you're managing state by
 * using the browser's URL params.
 */
export default function useHistory({ node, window, lifecycle, server }) {
    return (types = {}) => {
        const defaults = getDefaults(types);

        const location = window.document.location;
        !nodes.has(node) && nodes.set(node, { types, defaults, location, utils });
        lifecycle === 'unmount' && nodes.delete(node);

        return {
            params: utils.getParams(types, defaults, location),
            pushState: server ? () => {} : utils.changeState('pushState'),
            replaceState: server ? () => {} : utils.changeState('replaceState'),
        };
    };
}
