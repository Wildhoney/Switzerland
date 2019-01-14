import { create, init, m } from '/vendor/index.js';
import store from '../../utils/store.js';

const path = init(import.meta.url);

const container = ({
    todoInput = document.createElement('input'),
    redux,
    h,
    props
}) =>
    console.log(props) ||
    h.form(
        'default',
        {
            novalidate: true,
            onsubmit: async event => (
                event.preventDefault(),
                redux.actions.add(todoInput.value),
                (todoInput.value = '')
            )
        },
        [
            h.input('todo', {
                type: 'text',
                required: true,
                autoFocus: 'on',
                autoComplete: 'off',
                placeholder: 'What do you need to do?'
            }),
            button(props),
            h.stylesheet(path('styles/index.css')),
            h.stylesheet(path('styles/mobile.css'), '(max-width: 768px)'),
            h.stylesheet(path('styles/print.css'), 'print')
        ]
    );

const button = ({ defaultForm = document.createElement('form'), h }) =>
    h('button', {
        type: 'submit',
        class: 'add',
        disabled: !defaultForm.checkValidity()
    });

export default create('todo-input', store, m.vdom(container));
