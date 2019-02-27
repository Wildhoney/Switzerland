import { init } from '/vendor/index.js';
import todoInput from '../../todo-input/index.js';
import todoList from '../../todo-list/index.js';
import flagApp from '../../flag-app/index.js';
import * as u from '../utils.js';
import header from './header.js';
import list from './list.js';

const path = init(import.meta.url);

export default ({ h, props }) =>
    h('section', { class: 'todo-app' }, [
        h(todoInput),
        h(todoList),
        h(flagApp),
        header(props),
        list(props),
        h.vars({
            orderPosition: u.isBottom(props) ? 1 : -1,
            borderColour: u.isBottom(props)
                ? 'transparent'
                : 'rgba(0, 0, 0, 0.1)'
        }),
        h.sheet(path('../styles/index.css')),
        h.sheet(path('../styles/mobile.css'), '(max-width: 768px)'),
        h.sheet(path('../styles/print.css'), 'print')
    ]);
