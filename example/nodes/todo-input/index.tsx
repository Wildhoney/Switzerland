import { create, h, node, use } from 'switzerland';

import { actionCreators, store } from '../todo-app/utils';

export default create('todo-input', () => {
    // const form = use.form();
    const path = use.path(import.meta.url);
    const [text, setText] = use.state('');
    const [, , actions] = use.store(store, actionCreators);

    const handleSubmit = use.callback(
        (event) => {
            event.preventDefault();
            setText('');
            actions.add(text);
        },
        [text]
    );

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="todo"
                    required
                    minLength={3}
                    autoFocus
                    autoComplete="on"
                    placeholder="What do you need to do?"
                    value={text}
                    onInput={(event) => setText((event.target as any).value)}
                />

                <button type="submit" class="add" data-qa="add" />
            </form>

            <node.StyleSheet href={path('./styles/index.css')} />
            <node.StyleSheet href={path('./styles/mobile.css')} media="(max-width: 768px)" />
            <node.StyleSheet href={path('./styles/print.css')} media="print" />
        </>
    );
});
