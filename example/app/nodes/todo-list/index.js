import { create, h, t, utils } from 'switzerland';
import store from '../../utils/store.js';
import List from './components/list.js';
import Nothing from './components/nothing.js';
import db from '../../utils/db.js';

function controller({ adapter }) {
    adapter.attachShadow();

    const path = adapter.usePath(import.meta.url);
    const redux = adapter.state.useRedux(store);
    const history = adapter.useHistory({ filter: [t.Bool, false] });

    adapter.run.onMount(async () => {
        const { todos } = await db();
        redux.actions.put(todos);
    });

    return { path, redux, history };
}

function view({ redux, path, props }) {
    const hasTodos = redux.state.list.length > 0;

    return [
        h('ul', {}, hasTodos ? h(List, props) : h(Nothing, props)),

        h(utils.node.Sheet, { href: path('./styles/index.css') }),
        h(utils.node.Sheet, { href: path('./styles/mobile.css'), media: '(max-width: 768px)' }),
        h(utils.node.Sheet, { href: path('./styles/print.css'), media: 'print' }),
    ];
}

export default create('todo-list', { controller, view });
