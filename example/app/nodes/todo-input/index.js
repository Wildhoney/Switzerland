import { create, init, m } from '/vendor/index.js';
import store from '../../utils/store.js';

const path = init(import.meta.url);

const initialise = m.once(({ props }) => {
    const form = document.createElement('form');
    const input = document.createElement('input');
    return { ...props, e: { form, input } };
});

const container = ({ redux, e, h, render, props }) =>
    h(
        e.form,
        {
            novalidate: true,
            onsubmit: async event => (
                event.preventDefault(),
                redux.actions.add(e.input.value),
                (e.input.value = ''),
                render()
            )
        },
        [
            h(e.input, {
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
        disabled: !e.form.checkValidity()
    });

export default create(
    'todo-input',
    store,
    m.once(initialise),
    m.vdom(container)
);
