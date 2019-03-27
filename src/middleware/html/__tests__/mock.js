import {
    create,
    m
} from 'http://localhost:{port}/src/index.js';

create(
    'x-example',
    m.html(({ name = 'Adam', h }) => h('div', {}, `Hello ${name}!`))
);
