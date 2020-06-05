import { h } from 'switzerland';

export default function List({ history, redux }) {
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
