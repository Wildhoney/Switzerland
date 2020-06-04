import { create, m } from 'switzerland';
import store from '../../utils/store.js';

const middleware = [m.boundary(), store, m.path(import.meta.url), m.html(render), m.form()];

function render({ form, redux, path, h, server }) {
    const input = form?.elements.namedItem('todo');

    const handleSubmit = (event) => {
        event.preventDefault();
        redux.actions.add(input.value);
        input.value = '';
    };

    return h('form', { onSubmit: handleSubmit }, [
        h.sheet(path('./styles/index.css')),
        h.sheet(path('./styles/mobile.css'), '(max-width: 768px)'),
        h.sheet(path('./styles/print.css'), 'print'),

        h('input', {
            type: 'text',
            name: 'todo',
            required: true,
            minLength: 5,
            autoFocus: 'on',
            autoComplete: 'off',
            placeholder: 'What do you need to do?',
        }),

        h('button', {
            type: 'submit',
            class: 'add',
            disabled: server || !form?.default?.checkValidity(),
        }),
    ]);
}

export default create('todo-input', ...middleware);
