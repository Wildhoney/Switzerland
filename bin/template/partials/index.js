import { init } from 'https://cdn.jsdelivr.net/npm/switzerland@{version}/es/production/index.js';

const path = init(import.meta.url);

export default ({ h }) =>
    h('section', {}, [
        h('span', {}, '{name}'),
        h.sheet(path('../styles/index.css'))
    ]);
