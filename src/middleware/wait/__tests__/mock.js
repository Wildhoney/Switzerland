import { create, m } from '../../../../src/index.js';

create(
    'x-example',
    m.html(({ h }) => h('main', {}, [h('x-adam'), h('x-maria')])),
    m.wait('x-adam', 'x-maria')
);

create('x-adam', m.html(({ h }) => h('div', {}, 'Adam')));

create('x-maria', m.html(({ h }) => h('div', {}, 'Maria')));
