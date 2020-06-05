import { create, m, t, h, utils } from 'switzerland';
import TodoInput from '../todo-input/index.js';
import TodoList from '../todo-list/index.js';
import db from '../../utils/db.js';
import store from '../../utils/store.js';
import { isBottom } from './utils.js';

const middleware = [
    m.window(),
    store,
    m.path(import.meta.url),
    m.run('mount', initialise),
    m.run('mount', worker),
    m.boundary(),
    m.attrs({ logo: t.String }),
    m.loader((path) => ({ logo: path('./images/logo.png') })),
    m.html(render),
];

async function initialise(props) {
    const { todos } = await db();
    props.redux.actions.put(todos);
    return props;
}

async function worker(props) {
    try {
        props.window.navigator.serviceWorker &&
            (await props.window.navigator.serviceWorker.register(
                props.path('../../../utils/worker.js'),
                {
                    scope: '/',
                }
            ));
        return props;
    } catch {
        return props;
    }
}

function render({ path, loader, props }) {
    return [
        h('section', { class: 'todo-app' }, [
            h(TodoInput),
            h(TodoList),

            h('h1', { part: 'header' }, [
                h('a', { href: 'https://github.com/Wildhoney/Switzerland' }, [
                    h('img', { src: loader.logo }),
                ]),
            ]),
        ]),

        h(utils.node.Sheet, { href: path('./styles/index.css') }),
        h(utils.node.Sheet, { href: path('./styles/mobile.css'), media: '(max-width: 768px)' }),
        h(utils.node.Sheet, { href: path('./styles/print.css'), media: 'print' }),

        utils.node.Variables({
            orderPosition: isBottom(props) ? 1 : -1,
            borderColour: isBottom(props) ? 'transparent' : 'rgba(0, 0, 0, 0.1)',
        }),
    ];
}

export default create('todo-app', ...middleware);
