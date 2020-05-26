import { create, m } from '../../../../../src/index.js';

create(
    'x-example',
    m.methods({ setName: (name, props) => props.render({ name }) }),
    m.html(({ name = 'Adam', h }) => h('div', { class: name.toLowerCase() }, `Hey ${name}!`))
);
