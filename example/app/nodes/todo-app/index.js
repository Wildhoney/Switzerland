import { create, m } from 'switzerland';
import TodoInput from '../todo-input/index.js';
import TodoList from '../todo-list/index.js';

export default create(
    'todo-app',
    m.boundary(),
    m.window(import.meta.url),
    m.html(({ path, h }) => {
        return h('section', { class: 'todo-app' }, [
            h(TodoInput),
            h(TodoList),

            h('h1', { part: 'header' }, [
                h('a', { href: 'https://github.com/Wildhoney/Switzerland' }, [
                    h('img', { src: '' }),
                ]),
            ]),

            h.sheet(path('./styles/index.css')),
            h.sheet(path('./styles/mobile.css'), '(max-width: 768px)'),
            h.sheet(path('./styles/print.css'), 'print'),
        ]);
    })
);
