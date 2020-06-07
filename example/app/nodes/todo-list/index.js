import { create, m, h, t, utils } from 'switzerland';
import store from '../../utils/store.js';
import List from './components/list.js';
import Nothing from './components/nothing.js';
import { initialise } from './utils.js';

const middleware = [
    store,
    m.run('mount', initialise),
    m.boundary(),
    m.window(),
    m.history({
        filter: [t.Bool, false],
    }),
    m.path(import.meta.url),
    m.html(render),
];

function render({ redux, path, props }) {
    const hasTodos = redux.state.list.length > 0;

    return [
        h('ul', {}, hasTodos ? h(List, props) : h(Nothing, props)),

        h(utils.node.Sheet, { href: path('./styles/index.css') }),
        h(utils.node.Sheet, { href: path('./styles/mobile.css'), media: '(max-width: 768px)' }),
        h(utils.node.Sheet, { href: path('./styles/print.css'), media: 'print' }),
    ];
}

export default create('todo-list', ...middleware);
