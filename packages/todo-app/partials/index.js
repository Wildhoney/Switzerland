import { init } from '/vendor/index.js';

const path = init(import.meta.url);

export default ({ h }) =>
    h('main', {}, [
        h('img', { src: path('../images/icon.svg') }),
        h('p', {}, 'todo-app'),
        h.sheet(path('../styles/index.css'))
    ]);
