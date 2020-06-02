import { create, m } from 'switzerland';
import store from '../../utils/store.js';

const middleware = [
    m.boundary(),
    store,
    m.window(),
    m.history(),
    m.path(import.meta.url),
    m.html(render),
];

function render({ h, redux, path, props }) {
    const hasTodos = redux.state.list.length > 0;

    return h('ul', {}, [
        h.sheet(path('./styles/index.css')),
        h.sheet(path('./styles/mobile.css'), '(max-width: 768px)'),
        h.sheet(path('./styles/print.css'), 'print'),

        ...(hasTodos ? List(props) : []),
        ...(!hasTodos ? Nothing(props) : []),
    ]);
}

function List({ history, redux, h }) {
    const todos = redux.state.list
        .filter((model) => (history.params.get('filter') ? !model.done : true))
        .sort((a, b) => a.created - b.created);

    return todos.length === 0
        ? [h('li', { class: 'none' }, [h('p', {}, 'You are filtering out all completed todos.')])]
        : todos.map((model) =>
              h('li', { class: model.done ? 'done' : '' }, [
                  h('p', { onClick: () => redux.actions.mark(model.id) }, model.text),
                  h(
                      'button',
                      {
                          class: 'delete',
                          onClick: () => redux.actions.remove(model.id),
                      },
                      'Delete'
                  ),
              ])
          );
}

function Nothing({ h }) {
    return [h('li', { class: 'none' }, [h('p', {}, 'You have not added any todos yet.')])];
}

export default create('todo-list', ...middleware);
