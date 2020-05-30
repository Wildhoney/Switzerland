import { create, m } from 'switzerland';

export default create(
    'todo-input',
    m.boundary(),
    m.path(import.meta.url),
    m.html(({ path, h, render }) => {
        return h('form', {}, [
            h('input', {
                type: 'text',
                name: 'todo',
                required: true,
                minLength: 5,
                autoFocus: 'on',
                autoComplete: 'off',
                placeholder: 'What do you need to do?',
                oninput: render,
                onchange: render,
            }),

            h('button', {
                type: 'submit',
                class: 'add',
                disabled: true,
            }),

            h.sheet(path('./styles/index.css')),
            h.sheet(path('./styles/mobile.css'), '(max-width: 768px)'),
            h.sheet(path('./styles/print.css'), 'print'),
        ]);
    })
);
