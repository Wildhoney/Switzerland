import { create, init, m, t } from '/vendor/index.js';
import store from '../../utils/store.js';
import { retrieve, serviceWorker } from './middleware.js';
import * as u from './utils.js';
import todoInput from '../todo-input/index.js';
import todoList from '../todo-list/index.js';

const path = init(import.meta.url);

const container = ({ h, props }) =>
    h('section', { class: 'todo-app' }, [
        h(todoInput),
        h(todoList),
        header(props),
        list(props),
        h.variables({
            orderPosition: u.isBottom(props) ? 1 : -1,
            borderColour: u.isBottom(props)
                ? 'transparent'
                : 'rgba(0, 0, 0, 0.1)'
        }),
        h.stylesheet(path('styles/index.css')),
        h.stylesheet(path('styles/mobile.css'), '(max-width: 768px)'),
        h.stylesheet(path('styles/print.css'), 'print')
    ]);

const header = ({ loader, h }) =>
    h('h1', {}, [
        h('a', { href: 'https://github.com/Wildhoney/Switzerland' }, [
            h('img', { src: loader.logo })
        ])
    ]);

const list = ({ h, props }) =>
    h('ul', {}, [
        itemCompleted(props),
        itemPosition(props),
        props.adapt && itemDimensions(props),
        itemFilter(props)
    ]);

const itemCompleted = ({ redux, h }) =>
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

const itemPosition = ({ h, props }) =>
    h('li', {}, [
        h('em', {}, 'Logo: '),
        h(
            'a',
            {
                class: u.isBottom(props) ? 'active' : '',
                onclick: () => props.node.setAttribute('logo', 'bottom')
            },
            'Bottom'
        ),
        h('span', {}, ' / '),
        h(
            'a',
            {
                class: !u.isBottom(props) ? 'active' : '',
                onclick: () => props.node.setAttribute('logo', 'top')
            },
            'Top'
        )
    ]);

const itemDimensions = ({ h, adapt }) =>
    h('li', {}, [
        h('em', {}, 'Dimensions: '),
        h('span', {}, `${Math.round(adapt.width)}×${Math.round(adapt.height)}`)
    ]);

const itemFilter = ({ h, history }) =>
    h('li', {}, [
        h('em', {}, 'Complete: '),
        h(
            'a',
            {
                class: history.params.get('filter') ? '' : 'active',
                onclick: () => history.replace({}, '', '?filter=no')
            },
            'Show'
        ),
        h('span', {}, ' / '),
        h(
            'a',
            {
                class: !history.params.get('filter') ? '' : 'active',
                onclick: () => history.replace({}, '', '?filter=yes')
            },
            'Hide'
        )
    ]);

const retry = ({ render, h, props }) =>
    h('section', { class: 'todo-app' }, [
        h.stylesheet(path('styles/index.css')),
        header(props),
        h('button', { class: 'retry', onclick: render }, 'Retry')
    ]);

export default create(
    'todo-app',
    store,
    serviceWorker(path('../../utils/worker.js'), '/'),
    m.history({
        filter: [t.bool, false]
    }),
    m.loader({ logo: path('images/logo.png') }),
    m.rescue(m.vdom(retry)),
    m.methods({ insert: (value, { redux }) => redux.actions.add(value) }),
    m.once(retrieve),
    m.attrs({ logo: t.string }),
    m.adapt(),
    m.vdom(container),
    m.wait(todoInput, todoList)
);
