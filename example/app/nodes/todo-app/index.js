import { create, m, t, h, utils } from 'switzerland';
import TodoInput from '../todo-input/index.js';
import TodoList from '../todo-list/index.js';
import store from '../../utils/store.js';
import { isBottom, worker } from './utils.js';
import Position from './components/position.js';
import Dimensions from './components/dimensions.js';
import Filter from './components/filter.js';

const middleware = [
    store,
    m.path(import.meta.url),
    m.run('mount', worker),
    m.boundary(),
    m.adapt(),
    m.history({
        filter: [t.Bool, false],
    }),
    m.attrs({ logo: t.String }),
    m.html(render),
];

function render({ path, props }) {
    return [
        h('section', { class: 'todo-app' }, [
            h(TodoInput),
            h(TodoList),

            h('h1', { part: 'header' }, [
                h('a', { href: 'https://github.com/Wildhoney/Switzerland' }, [
                    h('img', { src: path('./images/logo.png') }),
                ]),
            ]),

            h('ul', {}, [h(Position, props), h(Filter, props), h(Dimensions, props)]),
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
