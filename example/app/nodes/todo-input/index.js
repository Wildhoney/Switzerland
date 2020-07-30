import { create, m, h, utils } from 'switzerland';
import store from '../../utils/store.js';

const middleware = [m.boundary(), store, m.path(import.meta.url), m.state({ text: '' }), m.html(render), m.form()];

function render({ form, redux, path, server, state, setState }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        return setState({ ...state, text: '' }), redux.actions.add(state.text);
    };

    return [
        h('form', { onSubmit: handleSubmit }, [
            h('input', {
                value: state.text,
                type: 'text',
                name: 'todo',
                required: true,
                minLength: 3,
                autoFocus: 'on',
                autoComplete: 'off',
                placeholder: 'What do you need to do?',
                onInput: (event) => setState({ ...state, text: event.target.value }),
            }),

            h('button', {
                type: 'submit',
                class: 'add',
                disabled: server || !form?.default?.checkValidity(),
            }),
        ]),

        h(utils.node.Sheet, { href: path('./styles/index.css') }),
        h(utils.node.Sheet, { href: path('./styles/mobile.css'), media: '(max-width: 768px)' }),
        h(utils.node.Sheet, { href: path('./styles/print.css'), media: 'print' }),
    ];
}

export default create('todo-input', ...middleware);
