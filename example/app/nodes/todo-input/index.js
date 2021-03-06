import { create, h, utils } from 'switzerland';
import { store, actionCreators } from '../../utils/store.js';

export default create('todo-input', ({ use, server }) => {
    use.shadow();

    const form = use.form();
    const path = use.path(import.meta.url);
    const [, actions] = use.state(store, { actionCreators });
    const [text, setText] = use.state('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setText('');
        actions.add(text);
    };

    return [
        h('form', { onSubmit: handleSubmit }, [
            h('input', {
                value: text,
                type: 'text',
                name: 'todo',
                required: true,
                minLength: 3,
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
        ]),

        h(utils.node.Sheet, { href: path('./styles/index.css') }),
        h(utils.node.Sheet, { href: path('./styles/mobile.css'), media: '(max-width: 768px)' }),
        h(utils.node.Sheet, { href: path('./styles/print.css'), media: 'print' }),
    ];
});
