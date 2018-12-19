import { getDefaults, getEventName, toCamelcase } from '../../core/utils.js';

const nodes = new Set();

const eventName = getEventName('update-state');

const notify = () => nodes.forEach(node => node.render());

window.addEventListener(eventName, notify);
window.addEventListener('popstate', notify);

export default function history(schema) {
    return props => {
        const defaults = getDefaults(schema);
        const params = new URLSearchParams(window.location.search);
        const get = params.get.bind(params);
        params.get = name => {
            const key = toCamelcase(name).fromSnake();
            const [f] = [].concat(schema[key] || (a => a));
            return get(name) ? f(get(name)) : defaults[key] || null;
        };

        !nodes.has(props.node) && nodes.add(props.node);

        return {
            ...props,
            history: {
                push: (...params) => {
                    window.history.pushState(...params);
                    props.dispatch(eventName, { params });
                },
                replace: (...params) => {
                    window.history.replaceState(...params);
                    props.dispatch(eventName, { params });
                },
                params
            }
        };
    };
}
