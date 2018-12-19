import { getDefaults, getEventName, toCamelcase } from '../../core/utils.js';

const nodes = new Set();

const eventName = getEventName('update-state');

const notify = () => nodes.forEach(node => node.render());

window.addEventListener(eventName, notify);
window.addEventListener('popstate', notify);
window.addEventListener('hashchange', notify);

export default function history(types = {}, location = window.location) {
    return props => {
        const defaults = getDefaults(types);
        const params = new URLSearchParams(location.search);
        const hash = location.hash;
        const get = params.get.bind(params);
        params.get = name => {
            const key = toCamelcase(name).fromSnake();
            const [f] = [].concat(types[key] || (a => a));
            return get(name) ? f(get(name)) : defaults[key] || null;
        };

        !nodes.has(props.node) && nodes.add(props.node);

        return {
            ...props,
            history: {
                hash,
                params,
                push: (...params) => {
                    window.history.pushState(...params);
                    props.dispatch(eventName, { params });
                },
                replace: (...params) => {
                    window.history.replaceState(...params);
                    props.dispatch(eventName, { params });
                }
            }
        };
    };
}
