import test from 'ava';
import { render } from '../index.js';
import { create, m, t as type } from '../../index.js';

test('It should be able to render a shallow component to string;', async t => {
    const component = create('x-example', m.html(({ h }) => h('div', {}, 'Hello Adam!')));
    t.is(await render(component), '<x-example class="resolved"><div>Hello Adam!</div></x-example>');
});

test('It should be able to render a shallow component with attributes to string;', async t => {
    const component = create(
        'x-example',
        m.attrs({ name: type.String, age: type.Int }),
        m.html(({ attrs, h }) => h('div', {}, `Hello ${attrs.name} you are ${attrs.age + 1} next!`))
    );
    t.is(
        await render(component, { name: 'Maria', age: 28 }),
        '<x-example name="Maria" age="28" class="resolved"><div>Hello Maria you are 29 next!</div></x-example>'
    );
});
