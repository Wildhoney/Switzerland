import { create, init, h, m } from '/vendor/index.js';
import store from '../../utils/store.js';

const path = init(import.meta);

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
        [h.stylesheet(path('styles.css')), input(props), button(props)]
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
