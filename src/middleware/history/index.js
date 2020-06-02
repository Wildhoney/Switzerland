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
                        params: utils.getParams(props.types, props.defaults, location),
                        pathname: location.pathname,
                        hash: location.hash,
                    },
                });
            })
        )
);

/**
 * @function history
 * ---
 * Observes and re-renders whenever the route has been updated. Passes the parsed props that can be
 * set by passing the params and their associated types. Useful for whenever you're managing state by
 * using the browser's URL params.
 */
export default (types = {}) => {
    const defaults = getDefaults(types);

    return function history(props) {
        const location = (props.window || window).document.location;
        !nodes.has(props.node) && nodes.set(props.node, { types, defaults, location, utils });
        props.lifecycle === 'unmount' && nodes.delete(props.node);

        return {
            ...props,
            history: {
                params: utils.getParams(types, defaults, location),
                pushState: props.server ? () => {} : utils.changeState('pushState'),
                replaceState: props.server ? () => {} : utils.changeState('replaceState'),
            },
        };
    };
};
