import { create, m, t } from 'switzerland';
import TodoInput from '../todo-input/index.js';
import TodoList from '../todo-list/index.js';
import * as utils from './utils.js';

export default create(
    'todo-app',
    m.boundary(),
    m.attrs({ logo: t.String }),
    m.window(import.meta.url),
    m.html(({ path, h, props }) => {
        return h('section', { class: 'todo-app' }, [
            h(TodoInput),
            h(TodoList),

            h('h1', { part: 'header' }, [
                h('a', { href: 'https://github.com/Wildhoney/Switzerland' }, [
                    h('img', { src: '' }),
                ]),
            ]),

            h.variables({
                orderPosition: utils.isBottom(props) ? 1 : -1,
                borderColour: utils.isBottom(props) ? 'transparent' : 'rgba(0, 0, 0, 0.1)',
            }),

            h.sheet(path('./styles/index.css')),
            h.sheet(path('./styles/mobile.css'), '(max-width: 768px)'),
            h.sheet(path('./styles/print.css'), 'print'),
        ]);
    })
);
