import { create, m } from 'switzerland';
import store from '../../utils/store.js';

const middleware = [
    m.boundary(),
    store,
    m.state(),
    m.path(import.meta.url),
    m.html(render),
    m.form(),
];

function render({ form, redux, path, h, state, server }) {
    const [text, setText] = state('');

    const handleSubmit = (event) => {
        event.preventDefault();
        return setText(''), redux.actions.add(text);
    };

    return h('form', { onSubmit: handleSubmit }, [
        h.sheet(path('./styles/index.css')),
        h.sheet(path('./styles/mobile.css'), '(max-width: 768px)'),
        h.sheet(path('./styles/print.css'), 'print'),

        h('input', {
            value: text,
            type: 'text',
            name: 'todo',
            required: true,
            minLength: 5,
            autoFocus: 'on',
            autoComplete: 'off',
            placeholder: 'What do you need to do?',
            onInput: (event) => setText(event.target.value),
        }),

        h('button', {
            type: 'submit',
            class: 'add',
            disabled: server || !form?.default?.checkValidity(),
        }),
    ]);
}

export default create('todo-input', ...middleware);
