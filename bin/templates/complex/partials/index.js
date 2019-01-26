import { init } from 'https://cdn.jsdelivr.net/npm/switzerland@{version}/es/production/index.js';

const path = init(import.meta.url);

export const container = ({ rolled, render, h }) =>
    h('main', { title: 'Click to roll the dice again!', onclick: render }, [
        h('img', { src: path('../images/dice.svg') }),
        h('p', {}, 'You rolled'),
        h('strong', {}, rolled),
        h.sheet(path('../css/index.css'))
    ]);
