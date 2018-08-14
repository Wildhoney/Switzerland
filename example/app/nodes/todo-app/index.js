import { create, init, h, m } from '/vendor/index.js';
import store from '../../utils/store.js';
import * as u from './utils.js';

const f = init(import.meta);

create(
    'todo-app',store,
    m.attrs(),
    m.adapt(),
    m.html(async ({ dimensions, redux }) =>
        h('section', { class: 'todo-app' }, [
            h('style', { type: 'text/css' }, await f.stylesheet('styles.css')),
            h('_todo-input', {}),
            h('_todo-list', {}),
            h('h1', {}, [
                h('a', { href: 'https://github.com/Wildhoney/Switzerland' }, [
                    h('img', { src: f.path('logo.png') })
                ])
            ]),
            h('ul', {}, [
                h('li', {}, [
                    h('em', {}, 'Completed: '),
                    h(
                        'span',
                        {},
                        `${redux.state.list.filter(x => x.done).length} of ${
                            redux.state.list.length
                        } ${u.pluralise(redux.state.list.length, 'task')}`
                    )
                ]),
                dimensions &&
                    h('li', {}, [
                        h('em', {}, 'Dimensions: '),
                        h(
                            'span',
                            {},
                            `${Math.round(dimensions.width)}×${Math.round(
                                dimensions.height
                            )}`
                        )
                    ])
            ])
        ])
    )
);
