import { create, init, h, m } from '/vendor/index.js';
import store from '../../utils/store.js';
import db from '../../utils/db.js';
import * as u from './utils.js';
import todoInput from '../todo-input/index.js';
import todoList from '../todo-list/index.js';

const path = init(import.meta.url);

const retrieve = async props => {
    const { todos } = await db();
    props.redux.actions.put(todos);
    return props;
};

const worker = m.once(async props => {
    try {
        navigator.serviceWorker &&
            (await navigator.serviceWorker.register(
                path('../../utils/worker.js'),
                { scope: '/' }
            ));
        return props;
    } catch (err) {
        return props;
    }
});

const isBottom = ({ attrs }) => attrs.logo === 'bottom';

const container = props =>
    h('section', { class: 'todo-app' }, [
        h(todoInput),
        h(todoList),
        header(props),
        h('ul', {}, [
            completed(props),
            position(props),
            props.adapt && dimensions(props)
        ]),
        h.variables({
            orderPosition: isBottom(props) ? 1 : -1,
            borderColour: isBottom(props) ? 'transparent' : 'rgba(0, 0, 0, 0.1)'
        }),
        h.stylesheet(path('styles/index.css')),
        h.stylesheet(path('styles/mobile.css'), '(max-width: 768px)'),
        h.stylesheet(path('styles/print.css'), 'print')
    ]);

const header = () =>
    h('h1', {}, [
        h('a', { href: 'https://github.com/Wildhoney/Switzerland' }, [
            h('img', { src: path('images/logo.png') })
        ])
    ]);

const completed = ({ redux }) =>
    h('li', {}, [
        h('em', {}, 'Completed: '),
        h(
            'span',
            {},
            `${redux.state.list.filter(x => x.done).length} of ${
                redux.state.list.length
            } ${u.pluralise(redux.state.list.length, 'task')}`
        )
    ]);

const position = ({ props }) =>
    h('li', {}, [
        h('em', {}, 'Logo: '),
        h(
            'a',
            {
                class: isBottom(props) ? 'active' : '',
                onclick: () => props.node.setAttribute('logo', 'bottom')
            },
            'Bottom'
        ),
        h('span', {}, ' / '),
        h(
            'a',
            {
                class: !isBottom(props) ? 'active' : '',
                onclick: () => props.node.setAttribute('logo', 'top')
            },
            'Top'
        )
    ]);

const dimensions = ({ adapt }) =>
    h('li', {}, [
        h('em', {}, 'Dimensions: '),
        h('span', {}, `${Math.round(adapt.width)}×${Math.round(adapt.height)}`)
    ]);

const retry = ({ render, props }) =>
    h('section', { class: 'todo-app' }, [
        h.stylesheet(path('styles.css')),
        header(props),
        h('button', { class: 'retry', onclick: render }, 'Retry')
    ]);

export default create(
    'todo-app',
    worker,
    store,
    m.rescue(m.html(retry)),
    m.once(retrieve),
    m.attrs(),
    m.adapt(),
    m.html(container),
    m.wait(todoInput, todoList),
    m.methods({ insert: (value, { redux }) => redux.actions.add(value) })
);
