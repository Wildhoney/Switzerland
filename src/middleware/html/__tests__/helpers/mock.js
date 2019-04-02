import { create, m } from '../../../../../src/index.js';

create(
    'x-example',
    m.html(({ name = 'Adam', render, h }) =>
        h('main', { onclick: () => render({ name: 'Adam' }) }, [
            h('div', {}, `Hello ${name}!`),
            h(
                'form',
                {
                    oncreate: form => render({ form }),
                    onsubmit: event => (
                        event.preventDefault(),
                        render({
                            name: event.target.elements.namedItem('value').value
                        })
                    )
                },
                [
                    h('input', { type: 'text', name: 'value' }),
                    h('button', { type: 'submit' })
                ]
            )
        ])
    )
);

create(
    'x-example-recycled',
    m.html(({ h }) => h('div', {}, 'Hello Adam!'), { recycle: true })
);
