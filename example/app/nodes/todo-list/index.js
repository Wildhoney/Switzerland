import { create, init, h, m } from '/vendor/index.js';
import store from '../../utils/store.js';

const f = init(import.meta);


create(
    'todo-list',
    store,
    m.html(async ({ redux }) =>
        h('ul', {}, [
            h('style', { type: 'text/css' }, await f.stylesheet('styles.css')),
            redux.state.list.map(model =>
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
            ),
            !redux.state.list.length &&
                h('li', { class: 'none' }, [
                    h('p', {}, 'You have not added any todos yet.')
                ])
        ])
    )
);
