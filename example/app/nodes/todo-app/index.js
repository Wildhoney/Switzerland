import { create, init } from '/vendor/index.js';
import middleware from './middleware.js';
import todoInput from '../todo-input/index.js';
import todoList from '../todo-list/index.js';
import * as u from './utils.js';
import header from './partials/header.js';
import list from './partials/list.js';

const path = init(import.meta.url);

export default create(
    'todo-app',
    ...middleware(({ h, props }) =>
        h('section', { class: 'todo-app' }, [
            h(todoInput),
            h(todoList),
            header(props),
            list(props),
            h.vars({
                orderPosition: u.isBottom(props) ? 1 : -1,
                borderColour: u.isBottom(props)
                    ? 'transparent'
                    : 'rgba(0, 0, 0, 0.1)'
            }),
            h.sheet(path('./styles/index.css')),
            h.sheet(path('./styles/mobile.css'), '(max-width: 768px)'),
            h.sheet(path('./styles/print.css'), 'print')
        ])
    )
);
