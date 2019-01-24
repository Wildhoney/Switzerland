import { init } from '/vendor/index.js';

const path = init(import.meta.url);

export default ({ h }) =>
    h('main', {}, [
        h('img', { src: path('../images/html.svg') }),
        h('p', {}, '{name}'),
        h.sheet(path('../styles/index.css'))
    ]);
