import { create, init, m, t } from '/vendor/index.js';
import store from '../../utils/store.js';

const path = init(import.meta.url);

const container = ({ redux, h, props }) =>
    h('ul', {}, [
        !!redux.state.list.length && list(props),
        !redux.state.list.length && nothing(props),
        h.stylesheet(path('styles/index.css')),
        h.stylesheet(path('styles/mobile.css'), '(max-width: 768px)'),
        h.stylesheet(path('styles/print.css'), 'print')
    ]);

const list = ({ history, redux, h, props }) => {
    const todos = redux.state.list
        .filter(model => (history.params.get('show_done') ? true : !model.done))
        .sort((a, b) => a.created - b.created);

    return todos.length === 0
        ? filtered(props)
        : todos.map(model =>
              h('li', { class: model.done ? 'done' : '' }, [
                  h(
                      'p',
                      { onclick: () => redux.actions.mark(model.id) },
                      model.text
                  ),
                  h(
                      'button',
                      {
                          class: 'delete',
                          onclick: () => redux.actions.remove(model.id)
                      },
                      'Delete'
                  )
              ])
          );
};

const nothing = ({ h }) =>
    h('li', { class: 'none' }, [
        h('p', {}, 'You have not added any todos yet.')
    ]);

const filtered = ({ history, h }) =>
    h('li', { class: 'none' }, [
        h('p', {}, 'You are filtering out all completed todos.')
    ]);

export default create(
    'todo-list',
    store,
    m.history({
        showDone: [t.Bool, true]
    }),
    m.vdom(container)
);
