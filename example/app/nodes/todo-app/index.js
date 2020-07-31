import { create, t, h, utils } from 'switzerland';
import TodoInput from '../todo-input/index.js';
import TodoList from '../todo-list/index.js';
import store from '../../utils/store.js';
import { isBottom, setupWorker } from './utils.js';
import Position from './components/position.js';
import Dimensions from './components/dimensions.js';
import Filter from './components/filter.js';

async function controller({ adapter, window }) {
    adapter.attachShadow();

    const path = await adapter.usePath(import.meta.url);
    const attrs = adapter.useAttrs({ logo: [t.String, 'top'] });
    const redux = adapter.useRedux(store);
    const history = adapter.useHistory({ filter: [t.Bool, false] });
    const adapt = adapter.useDimensions();

    adapter.run.onMount(() => setupWorker({ path, window }));

    return { path, attrs, redux, history, adapt };
}

function view({ path, props, attrs }) {
    return [
        h('section', { class: 'todo-app' }, [
            h(TodoInput),
            h(TodoList),

            h('h1', { part: 'header' }, [
                h('a', { href: 'https://github.com/Wildhoney/Switzerland' }, [
                    h('img', { src: path('./images/logo.png') }),
                ]),
            ]),

            h('ul', {}, [h(Position, props), h(Filter, props), h(Dimensions, props)]),
        ]),

        h(utils.node.Sheet, { href: path('./styles/index.css') }),
        h(utils.node.Sheet, { href: path('./styles/mobile.css'), media: '(max-width: 768px)' }),
        h(utils.node.Sheet, { href: path('./styles/print.css'), media: 'print' }),

        utils.node.Variables({
            orderPosition: isBottom(attrs) ? 1 : -1,
            borderColour: isBottom(attrs) ? 'transparent' : 'rgba(0, 0, 0, 0.1)',
        }),
    ];
}

export default create('todo-app', controller, view);
