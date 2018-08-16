import { create, init, h, m } from '/vendor/index.js';
import store from '../../utils/store.js';
import db from '../../utils/db.js';
import * as u from './utils.js';
import todoInput from '../todo-input/index.js';
import todoList from '../todo-list/index.js';

const f = init(import.meta);

let called = false;

const retrieve = async props => {
    const { todos } = await db();
    if (!called) {
        await Promise.all(todos.map(props.redux.actions.put));
        called = true;
    }
    return props;
};

const container = async props =>
    h('section', { class: 'todo-app' }, [
        await f.stylesheet('styles.css'),
        h(todoInput, {}),
        h(todoList, {}),
        header(props),
        h('ul', {}, [completed(props), props.dimensions && dimensions(props)])
    ]);

const header = () =>
    h('h1', {}, [
        h('a', { href: 'https://github.com/Wildhoney/Switzerland' }, [
            h('img', { src: f.path('logo.png') })
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

export default create('todo-app', store, retrieve, m.wait('todo-input', 'ul'), m.attrs(), m.adapt(), m.html(container));
