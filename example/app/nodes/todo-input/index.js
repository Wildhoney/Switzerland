import { create, m, h, utils } from 'switzerland';
import store from '../../utils/store.js';

const middleware = [
    m.boundary(),
    store,
    m.bind(),
    m.path(import.meta.url),
    m.html(render),
    m.form(),
];

function render({ form, redux, path, bind, server }) {
    const [todo, setTodo] = bind.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        return setTodo(''), redux.actions.add(todo);
    };

    return [
        h('form', { onSubmit: handleSubmit }, [
            h('input', {
                value: todo,
                type: 'text',
                name: 'todo',
                required: true,
                minLength: 3,
                autoFocus: 'on',
                autoComplete: 'off',
                placeholder: 'What do you need to do?',
                onInput: (event) => setTodo(event.target.value),
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
