import { create, init, h, m } from '/vendor/index.js';
import store from '../../utils/store.js';
import db from '../../utils/db.js';
import * as u from './utils.js';
import todoInput from '../todo-input/index.js';
import todoList from '../todo-list/index.js';

const path = init(import.meta);

const retrieve = async props => {
    const { todos } = await db();
    props.redux.actions.put(todos);
    return props;
};

const container = props =>
    h('section', { class: 'todo-app' }, [
        h.stylesheet('styles.css'),
        h(todoInput),
        h(todoList),
        header(props),
        h('ul', {}, [completed(props), props.dimensions && dimensions(props)])
    ]);

const header = () =>
    h('h1', {}, [
        h('a', { href: 'https://github.com/Wildhoney/Switzerland' }, [
            h('img', { src: path('logo.png') })
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

const dimensions = ({ dimensions }) =>
    h('li', {}, [
        h('em', {}, 'Dimensions: '),
        h(
            'span',
            {},
            `${Math.round(dimensions.width)}×${Math.round(dimensions.height)}`
        )
    ]);

const retry = ({ render, props }) =>
    h('section', { class: 'todo-app' }, [
        h.stylesheet('styles.css'),
        header(props),
        h('button', { class: 'retry', onclick: render }, 'Retry')
    ]);

export default create(
    'todo-app',
    store,
    m.rescue(m.html(retry)),
    m.once(retrieve),
    m.attrs(),
    m.adapt(),
    m.html(container),
    m.wait(todoInput, todoList),
    m.methods({ insert: (value, { redux }) => redux.actions.add(value) })
);
