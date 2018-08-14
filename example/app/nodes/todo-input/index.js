import { create, init, h, m } from '/vendor/index.js';
import store from '../../utils/store.js';

const f = init(import.meta);

create(
    'todo-input',
    store,
    m.html(async ({ value = '', redux, render }) =>
        h(
            'form',
            {
                novalidate: true,
                onsubmit: async event => (
                    event.preventDefault(),
                    await render({ value: '' }),
                    redux.actions.add(value)
                )
            },
            [
                h(
                    'style',
                    { type: 'text/css' },
                    await f.stylesheet('styles.css')
                ),
                h('input', {
                    value,
                    type: 'text',
                    required: true,
                    name: 'todo',
                    autoFocus: 'on',
                    autoComplete: 'off',
                    placeholder: 'What do you need to do?',
                    oninput: ({ target }) => render({ value: target.value })
                }),
                h('button', {
                    type: 'submit',
                    class: 'add',
                    disabled: !value && !value.trim()
                })
            ]
        )
    )
);
