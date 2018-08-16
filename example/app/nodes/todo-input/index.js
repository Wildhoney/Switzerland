import { create, init, h, m } from '/vendor/index.js';
import store from '../../utils/store.js';

const f = init(import.meta);

const container = async ({ value, render, redux, props }) =>
    h(
        'form',
        {
            novalidate: true,
            onsubmit: async event => (
                event.preventDefault(),
                await render({ value: '' }),
                redux.actions.add(value)
            )
        },
        [await f.stylesheet('styles.css'), input(props), button(props)]
    );

const input = ({ value = '', render }) =>
    h('input', {
        value,
        type: 'text',
        required: true,
        name: 'todo',
        autoFocus: 'on',
        autoComplete: 'off',
        placeholder: 'What do you need to do?',
        oninput: ({ target }) => render({ value: target.value })
    });

const button = ({ value = '' }) =>
    h('button', {
        type: 'submit',
        class: 'add',
        disabled: !value && !value.trim()
    });

export default create('todo-input', store, m.html(container));
