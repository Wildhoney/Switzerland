import { create, m, t } from '../../../../../src/index.js';

create(
    'x-example',
    m.attrs({ name: [t.String, 'Adam'], age: [t.Int, 33] }),
    m.html(({ attrs, h }) =>
        h(
            'div',
            {},
            `Privet ${attrs.name}! You are ${attrs.age > 30 ? 'old' : 'young'}.`
        )
    )
);
