import { create, init, m } from '/vendor/index.js';
import store from '../../utils/store.js';

const path = init(import.meta.url);

const container = ({ todoInput, redux, h, props }) =>
    h.form(
        {
            name: 'default',
            novalidate: true,
            onsubmit: async event => (
                event.preventDefault(),
                redux.actions.add(todoInput.value),
                todoInput.update('')
            )
        },
        [
            h.field('input', {
                type: 'text',
                name: 'todo',
                minLength: 5,
                required: true,
                autoFocus: 'on',
                autoComplete: 'off',
                placeholder: 'What do you need to do?'
            }),
            button(props),
            h.sheet(path('styles/index.css')),
            h.sheet(path('styles/mobile.css'), '(max-width: 768px)'),
            h.sheet(path('styles/print.css'), 'print')
        ]
    );

const button = ({ defaultForm, todoInput, h }) =>
    h('button', {
        type: 'submit',
        class: 'add',
        disabled: !todoInput || !defaultForm || !defaultForm.checkValidity()
    });

export default create('todo-input', store, m.vdom(container));
