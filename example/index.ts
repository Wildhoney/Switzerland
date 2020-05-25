import { create, h, m, t } from '../src/index.js';

create(
    'x-people',
    m.attrs({ names: t.Array(t.String) }),
    m.html(({ attrs }) =>
        h(
            'ul',
            {},
            attrs.names.map((name) => h('li', {}, name))
        )
    )
);
