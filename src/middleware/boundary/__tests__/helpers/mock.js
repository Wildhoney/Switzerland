import { create, m } from '../../../../../src/index.js';

create(
    'x-example',
    m.boundary(),
    m.html(({ h }) => h('div', {}, 'Hello Adam!'))
);
