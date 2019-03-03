import { init, m, t } from '/vendor/index.js';
import db from '../../utils/db.js';
import store from '../../../utils/store.js';
import todoInput from '../todo-input/index.js';
import todoList from '../todo-list/index.js';
import retry from './partials/retry.js';

const path = init(import.meta.url);

const retrieve = async props => {
    const { todos } = await db();
    props.redux.actions.put(todos);
    return props;
};

const serviceWorker = (path, scope) => {
    return m.once(async props => {
        try {
            navigator.serviceWorker &&
                (await navigator.serviceWorker.register(path, {
                    scope
                }));
            return props;
        } catch (_) {
            return props;
        }
    });
};

export default tree => [
    store,
    serviceWorker(path('../../../utils/worker.js'), '/'),
    m.history({
        filter: [t.Bool, false]
    }),
    m.loader({ logo: path('./images/logo.png') }),
    m.rescue(m.html(retry)),
    m.methods({ insert: (value, { redux }) => redux.actions.add(value) }),
    m.once(retrieve),
    m.attrs({ logo: t.String }),
    m.adapt(),
    m.html(tree),
    m.wait(todoInput, todoList)
];
