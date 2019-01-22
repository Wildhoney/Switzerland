import { init } from '/vendor/index.js';

const path = init(import.meta.url);

export default ({ redux, e, h, render }) =>
    h(
        e.form,
        {
            novalidate: true,
            onsubmit: async event => (
                event.preventDefault(),
                redux.actions.add(e.input.value),
                (e.input.value = '')
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
                oninput: render,
                onchange: render
            }),
            h('button', {
                type: 'submit',
                class: 'add',
                disabled: !e.form.isConnected || !e.form.checkValidity()
            }),
            h.sheet(path('../styles/index.css')),
            h.sheet(path('../styles/mobile.css'), '(max-width: 768px)'),
            h.sheet(path('../styles/print.css'), 'print')
        ]
    );
