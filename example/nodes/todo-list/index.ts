import { create, h, use, node } from 'switzerland';
// import { store, actionCreators } from '../../utils/store.js';
import List from './components/list';
import Nothing from './components/nothing';
// import db from '../../utils/db.js';

export default create('todo-list', () => {
    // use.shadow();

    const path = use.path(import.meta.url);
    // const [state, actions] = use.state(store, { actionCreators });
    // const history = use.history({ filter: [type.Bool, false] });

    // use.on.mount(async () => {
    //     const { todos } = await db();
    //     actions.put(todos);
    // });

    // const hasTodos = state.list.length > 0;
    const hasTodos = false;

    return h(node.Fragment, {}, [
        // h('ul', {}, hasTodos ? h(List, {}) : h(Nothing, {})),
        h('ul', {}, h(Nothing, {})),

        h('link', { rel: 'stylesheet', type: 'text/css', href: path('./styles/index.css') }),
        h('link', {
            rel: 'stylesheet',
            type: 'text/css',
            media: '(max-width: 768px)',
            href: path('./styles/mobile.css'),
        }),
        h('link', { rel: 'stylesheet', type: 'text/css', media: 'print', href: path('./styles/print.css') }),

        // h(utils.node.Sheet, { href: path('./styles/index.css') }),
        // h(utils.node.Sheet, { href: path('./styles/mobile.css'), media: '(max-width: 768px)' }),
        // h(utils.node.Sheet, { href: path('./styles/print.css'), media: 'print' }),
    ]);
});
