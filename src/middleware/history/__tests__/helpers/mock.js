import { create, m, t } from '../../../../../src/index.js';

const isShowingAge = (hash) => hash === '#showAge';

create(
    'x-example',
    m.history({ name: [t.String, 'Adam'], age: [t.Int, 33] }),
    m.html(({ history, h }) => {
        const name = history.params.get('name');
        const age = history.params.get('age');

        return h('main', {}, [
            h(
                'div',
                {},
                `Hola ${name}! You are ${age > 30 ? 'old' : 'young'}${
                    isShowingAge(window.location.hash) ? ` at ${age}` : ''
                }.`
            ),
            h(
                'a',
                {
                    class: 'params',
                    onclick: () => history.pushState({}, '', '?name=Maria&age=28'),
                },
                'Click!'
            ),
            h(
                'a',
                {
                    class: 'hash',
                    onclick: () => (window.location.hash = '#showAge'),
                },
                'Click!'
            ),
        ]);
    })
);
