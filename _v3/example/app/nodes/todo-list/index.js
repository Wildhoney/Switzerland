import { create, init } from 'switzerland';
import middleware from './middleware.js';
import list from './partials/list.js';
import nothing from './partials/nothing.js';

const path = init(import.meta.url);

const tree = ({ redux, h, props }) =>
    h('ul', {}, [
        !!redux.state.list.length && list(props),
        !redux.state.list.length && nothing(props),
        h.sheet(path('./styles/index.css')),
        h.sheet(path('./styles/mobile.css'), '(max-width: 768px)'),
        h.sheet(path('./styles/print.css'), 'print'),
    ]);

export default create('todo-list', ...middleware(tree));
