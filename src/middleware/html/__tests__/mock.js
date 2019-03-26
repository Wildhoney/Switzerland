import {
    create,
    m
} from 'https://cdn.jsdelivr.net/npm/switzerland@latest/es/production/index.js';

create('x-example', m.html(({ h }) => h('div', {}, 'Hello!')));
