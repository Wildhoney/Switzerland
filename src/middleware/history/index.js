import * as u from './utils.js';

export const nodes = new Set();

[u.eventName, 'popstate', 'hashchange'].forEach(eventName =>
    window.addEventListener(eventName, () =>
        nodes.forEach(node => node.render())
    )
);

export default function history(types = {}, location = window.location) {
    return props => {
        !nodes.has(props.node) && nodes.add(props.node);

        const params = new URLSearchParams(location.search);
        const get = params.get.bind(params);
        params.get = u.createPatch(get, types);

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
