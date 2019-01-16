import { create, init, m } from '/vendor/index.js';
import store from '../../utils/store.js';

const path = init(import.meta.url);

const initialise = m.once(({ props }) => {
    const defaultForm = document.createElement('form');
    const todoInput = document.createElement('input');
    return { ...props, e: { defaultForm, todoInput } };
});

const container = ({ redux, e, h, render, props }) =>
    h(
        e.defaultForm,
        {
            novalidate: true,
            onsubmit: async event => (
                event.preventDefault(),
                redux.actions.add(e.todoInput.value),
                (e.todoInput.value = ''),
                render()
            )
        },
        [
            h(e.todoInput, {
                type: 'text',
                required: true,
                minLength: 5,
                autoFocus: 'on',
                autoComplete: 'off',
                placeholder: 'What do you need to do?',
                oninput: render
            }),
            button(props),
            h.sheet(path('styles/index.css')),
            h.sheet(path('styles/mobile.css'), '(max-width: 768px)'),
            h.sheet(path('styles/print.css'), 'print')
        ]
    );

const button = ({ e, h }) =>
    h('button', {
        type: 'submit',
        class: 'add',
        disabled: !e.defaultForm.checkValidity()
    });

export default create(
    'todo-input',
    store,
    m.once(initialise),
    m.vdom(container)
);
