import { init } from 'switzerland';

const path = init(import.meta.url);

export default ({ h }) =>
    h('section', {}, [
        h('h1', {}, '{name}'),
        h.sheet(path('../styles/index.css'))
    ]);
