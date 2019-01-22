import { init } from '/vendor/index.js';
import header from './header.js';

const path = init(import.meta.url);

export default ({ render, h, props, error }) =>
    h('section', { class: 'todo-app' }, [
        h.sheet(path('styles/index.css')),
        header(props),
        h('div', { class: 'error' }, [
            h('div', { class: 'message' }, error.message),
            h('button', { class: 'retry', onclick: render }, 'Retry')
        ])
    ]);
