import { create, m } from 'switzerland';

export default create(
    'todo-list',
    m.boundary(),
    m.window(import.meta.url),
    m.html(({ redux, h, path }) => {
        const todos = [];

        return h('ul', {}, [
            todos.length === 0
                ? h('li', { class: 'none' }, [
                      h('p', {}, 'You are filtering out all completed todos.'),
                  ])
                : todos.map((model) =>
                      h('li', { class: model.done ? 'done' : '' }, [
                          h('p', { onclick: () => redux.actions.mark(model.id) }, model.text),
                          h(
                              'button',
                              {
                                  class: 'delete',
                                  onclick: () => redux.actions.remove(model.id),
                              },
                              'Delete'
                          ),
                      ])
                  ),

            h.sheet(path('./styles/index.css')),
            h.sheet(path('./styles/mobile.css'), '(max-width: 768px)'),
            h.sheet(path('./styles/print.css'), 'print'),
        ]);
    })
);
