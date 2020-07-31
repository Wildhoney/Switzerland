import { create, h, utils } from 'switzerland';
import store from '../../utils/store.js';
import * as duck from './duck.js';

async function controller({ adapter }) {
    adapter.attachShadow();

    const path = await adapter.usePath(import.meta.url);
    const redux = adapter.useRedux(store);
    const [state, methods] = adapter.useState(duck.createMethods, duck.initialState);

    const handleSubmit = (event) => {
        event.preventDefault();
        methods.setText('');
        redux.actions.add(state.text);
    };

    return { path, state, methods, handleSubmit };
}

function view({ form, path, server, state, methods, handleSubmit }) {
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
                onInput: (event) => methods.setText(event.target.value),
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

export default create('todo-input', controller, view);
