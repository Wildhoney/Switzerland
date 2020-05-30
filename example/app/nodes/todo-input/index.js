import { create, m } from 'switzerland';

export default create(
    'todo-input',
    m.boundary(),
    m.path(import.meta.url),
    m.html(({ path, h, f, server }) => {
        const [text, setText] = f.useState('');

        return h('form', {}, [
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
                disabled: server,
            }),

            h.sheet(path('./styles/index.css')),
            h.sheet(path('./styles/mobile.css'), '(max-width: 768px)'),
            h.sheet(path('./styles/print.css'), 'print'),
        ]);
    })
);
