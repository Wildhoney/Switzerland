import { create, init, h, m } from '/vendor/index.js';
import store from '../../utils/store.js';

const path = init(import.meta.url);

const container = ({ value, render, redux, props }) =>
    h(
        'form',
        {
            novalidate: true,
            oncreate: form => props.render({ form }),
            onsubmit: async event => (
                event.preventDefault(),
                await render({ value: '' }),
                redux.actions.add(value)
            )
        },
        [
            input(props),
            button(props),
            h.stylesheet(path('styles/index.css')),
            h.stylesheet(path('styles/mobile.css'), '(max-width: 768px)'),
            h.stylesheet(path('styles/print.css'), 'print')
        ]
    );

const input = ({ value = '', render }) =>
    h('input', {
        value,
        type: 'text',
        required: true,
        name: 'todo',
        autoFocus: 'on',
        autoComplete: 'off',
        placeholder: 'What do you need to do?',
        oninput: ({ target }) => render({ value: target.value })
    });

const button = ({ form }) =>
    h('button', {
        type: 'submit',
        class: 'add',
        disabled: !form || !form.checkValidity()
    });

export default create('todo-input', store, m.html(container));
