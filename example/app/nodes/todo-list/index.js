import { create, m ,h,utils} from 'switzerland';
import store from '../../utils/store.js';

const middleware = [
    m.boundary(),
    store,
    m.window(),
    m.history(),
    m.path(import.meta.url),
    m.html(render),
];

function render({ redux, path, props }) {
    const hasTodos = redux.state.list.length > 0;

    return h('ul', {}, [
        h(utils.node.Sheet, { href: path('./styles/index.css') }),
        h(utils.node.Sheet, { href: path('./styles/mobile.css'), media: '(max-width: 768px)' }),
        h(utils.node.Sheet, { href: path('./styles/print.css'), media: 'print' }),

        ...(hasTodos ? List(props) : []),
        ...(!hasTodos ? Nothing(props) : []),
    ]);
}

function List({ history, redux,  }) {
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

function Nothing() {
    return [h('li', { class: 'none' }, [h('p', {}, 'You have not added any todos yet.')])];
}

export default create('todo-list', ...middleware);
