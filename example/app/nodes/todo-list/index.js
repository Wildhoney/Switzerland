import { create, h, type, utils } from 'switzerland';
import { store, actionCreators } from '../../utils/store.js';
import List from './components/list.js';
import Nothing from './components/nothing.js';
import db from '../../utils/db.js';

export default create('todo-list', ({ use, props }) => {
    use.shadow();

    const path = use.path(import.meta.url);
    const [state, actions] = use.state(store, { actionCreators });
    const history = use.history({ filter: [type.Bool, false] });

    use.on.mount(async () => {
        const { todos } = await db();
        actions.put(todos);
    });

    const hasTodos = state.list.length > 0;

    return [
        h('ul', {}, hasTodos ? h(List, { history, actions, list: state.list }) : h(Nothing, props)),

        h(utils.node.Sheet, { href: path('./styles/index.css') }),
        h(utils.node.Sheet, { href: path('./styles/mobile.css'), media: '(max-width: 768px)' }),
        h(utils.node.Sheet, { href: path('./styles/print.css'), media: 'print' }),
    ];
});
