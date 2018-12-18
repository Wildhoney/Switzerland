import { getDefaults, getEventName } from '../../core/utils.js';
import * as u from './utils.js';

const nodes = new Set();

const notify = () => nodes.forEach(node => node.render());

window.addEventListener('@switzerland/update-state', notify);
window.addEventListener('popstate', notify);

const eventName = getEventName('update-state');

export default function history(schema) {
    return props => {
        const defaults = getDefaults(schema);
        const params = new URLSearchParams(window.location.search);
        const get = params.get.bind(params);
        params.get = name => {
            const key = u.snakeToCamel(name);
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
