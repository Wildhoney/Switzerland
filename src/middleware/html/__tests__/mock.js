import {
    create,
    m
} from 'https://cdn.jsdelivr.net/npm/switzerland@latest/es/production/index.js';

create('x-example', m.html(({ name = "Adam", h }) => h('div', {}, `Hello ${name}!`)));
