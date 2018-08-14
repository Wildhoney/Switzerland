import { create, init, h, m } from '/vendor/index.js';
import store from '../../utils/store.js';
import * as u from './utils.js';

const f = init(import.meta);

const container = async props =>
    h('section', { class: 'todo-app' }, [
        await f.stylesheet('styles.css'),
        h('_todo-input', {}),
        h('_todo-list', {}),
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

create('todo-app', store, m.attrs(), m.adapt(), m.html(container));
