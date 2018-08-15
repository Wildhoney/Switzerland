import { create, init, h, m } from '/vendor/index.js';
import store from '../../utils/store.js';

const f = init(import.meta);

const container = async ({ redux, props }) =>
    h('ul', {}, [
        await f.stylesheet('styles.css'),
        list(props),
        !redux.state.list.length && nothing(props)
    ]);

const list = ({ redux }) =>
    redux.state.list.sort((a, b) => a.created - b.created).map(model =>
        h('li', { class: model.done ? 'done' : '' }, [
            h('p', { onclick: () => redux.actions.mark(model.id) }, model.text),
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

const nothing = () =>
    h('li', { class: 'none' }, [
        h('p', {}, 'You have not added any todos yet.')
    ]);

create('todo-list', store, m.html(container));
