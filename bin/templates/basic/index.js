import {
    create,
    init,
    m
} from 'https://cdn.jsdelivr.net/npm/switzerland@{version}/es/production/index.js';
import { roll } from './middleware.js';

const path = init(import.meta.url);

export default create(
    '{name}',
    roll,
    m.html(({ rolled, render, h }) =>
        h('main', { title: 'Click to roll the dice again!', onclick: render }, [
            h('img', { src: path('./images/dice.svg') }),
            h('p', {}, 'You rolled'),
            h('strong', {}, rolled),
            h.sheet(path('./css/index.css'))
        ])
    )
);
