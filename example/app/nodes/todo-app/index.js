import { create, utils, fetch, h, type } from 'switzerland';
import { isBottom, createServiceWorker } from './utils.js';
import Position from './components/position.js';
import Dimensions from './components/dimensions.js';
import Filter from './components/filter.js';
import resize from './helpers/resize.js';

export default create('todo-app', async ({ node, use, window }) => {
    use.shadow();

    const path = use.path(import.meta.url);
    const attrs = use.attributes({ logo: [type.String, 'top'] });
    const history = use.history({ filter: [type.Bool, false] });
    const dimensions = use(resize);

    createServiceWorker({ path, window });

    return [
        h('section', { class: 'todo-app', another: { test: { name: 'resursive' } } }, [
            h(await fetch(import('../todo-input/index.js'))),
            h(await fetch(import('../todo-list/index.js'))),

            h('h1', { part: 'header' }, [
                h('a', { href: 'https://github.com/Wildhoney/Switzerland' }, [
                    h('img', { src: path('./images/logo.png') }),
                ]),
            ]),

            h('ul', {}, [h(Position, { node, attrs }), h(Filter, { history }), h(Dimensions, { dimensions })]),
        ]),

        h(utils.node.Sheet, { href: path('./styles/index.css') }),
        h(utils.node.Sheet, { href: path('./styles/mobile.css'), media: '(max-width: 768px)' }),
        h(utils.node.Sheet, { href: path('./styles/print.css'), media: 'print' }),

        utils.node.Variables({
            orderPosition: isBottom(attrs) ? 1 : -1,
            borderColour: isBottom(attrs) ? 'transparent' : 'rgba(0, 0, 0, 0.1)',
        }),
    ];
});
