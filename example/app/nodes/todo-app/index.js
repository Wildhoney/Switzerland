import { create, utils, fetch, t, h } from 'switzerland';
import store from '../../utils/store.js';
import { isBottom, setupWorker } from './utils.js';
import Position from './components/position.js';
import Dimensions from './components/dimensions.js';
import Filter from './components/filter.js';

function controller({ adapter, window }) {
    adapter.attachShadow();

    const redux = adapter.state.useRedux(store);
    const adapt = adapter.observer.useResize();
    const attrs = adapter.useAttrs({ logo: [t.String, 'top'] });
    const path = adapter.usePath(import.meta.url);
    const history = adapter.useHistory({ filter: [t.Bool, false] });

    adapter.attachServiceWorker(path('worker.js'));

    adapter.run.onMount(() => setupWorker({ path, window }));

    return { path, attrs, redux, history, adapt };
}

async function view({ path, props, attrs }) {
    return [
        h('section', { class: 'todo-app' }, [
            h(await fetch(import('../todo-input/index.js'))),
            h(await fetch(import('../todo-list/index.js'))),

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

export default create('todo-app', { controller, view });
