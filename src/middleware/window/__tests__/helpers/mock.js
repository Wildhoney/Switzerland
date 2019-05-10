import { create, m } from '../../../../../src/index.js';

create(
    'x-example',
    m.window('https://www.example.org/'),
    m.html(({ window, h }) => h('main', {}, `We're running on ${window.location.hostname}!`))
);
