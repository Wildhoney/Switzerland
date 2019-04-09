import { create, init } from '/vendor/index.js';
import middleware from './middleware.js';

const path = init(import.meta.url);

export default create(
    'todo-input',
    ...middleware(({ form, redux, h, render }) => {
        const input = form && form.elements.namedItem('todo');

        return h(
            'form',
            {
                oncreate: form => render({ form }),
                onsubmit: async event => (
                    event.preventDefault(), redux.actions.add(input.value), (input.value = '')
                )
            },
            [
                h('input', {
                    type: 'text',
                    name: 'todo',
                    required: true,
                    minLength: 5,
                    autoFocus: 'on',
                    autoComplete: 'off',
                    placeholder: 'What do you need to do?',
                    oninput: render,
                    onchange: render
                }),
                h('button', {
                    type: 'submit',
                    class: 'add',
                    disabled: form ? !form.checkValidity() : true
                }),
                h.sheet(path('./styles/index.css')),
                h.sheet(path('./styles/mobile.css'), '(max-width: 768px)'),
                h.sheet(path('./styles/print.css'), 'print')
            ]
        );
    })
);
