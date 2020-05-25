import { create, h, m, t } from '../src/index.js';

const person = create(
    'x-person',
    m.attrs({ name: t.String }),
    m.html(({ attrs }) => attrs.name)
);

create(
    'x-people',
    m.attrs({ names: t.Array(t.String) }),
    m.html(({ attrs }) =>
        h(
            'ul',
            {},
            attrs.names.map((name) => h('li', {}, [h(person, { name })]))
        )
    )
);
