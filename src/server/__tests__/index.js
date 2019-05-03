import test from 'ava';
import { create, m, t as type } from '../../index.js';
import { render } from '../index.js';

test.serial('It should be able to render a shallow component to string;', async t => {
    const component = create('x-example', m.html(({ h }) => h('div', {}, 'Hello Adam!')));
    t.is(await render(component), '<x-example class="resolved"><div>Hello Adam!</div></x-example>');
});

test.serial(
    'It should be able to render a shallow component with attributes to string;',
    async t => {
        const component = create(
            'x-example',
            m.attrs({ name: type.String, age: type.Int }),
            m.html(({ attrs, h }) =>
                h('div', {}, `Hello ${attrs.name} you are ${attrs.age + 1} next!`)
            )
        );
        t.is(
            await render(component, { name: 'Maria', age: 28 }),
            '<x-example name="Maria" age="28" class="resolved"><div>Hello Maria you are 29 next!</div></x-example>'
        );
    }
);

test.serial('It should be able to render a nested component to string;', async t => {
    const child = create('x-child', m.html(({ h }) => h('div', {}, 'Adam')));
    const parent = create(
        'x-parent',
        m.html(({ h }) => h('div', {}, [h('span', {}, 'Hello'), h(child), h('span', {}, '!')]))
    );
    t.is(
        await render(parent),
        '<x-parent class="resolved"><div><span>Hello</span><x-child class="resolved"><div>Adam</div></x-child><span>!</span></div></x-parent>'
    );
});

test.serial(
    'It should be able to render a nested component with attributes to string;',
    async t => {
        const child = create(
            'x-child',
            m.attrs({ name: type.String }),
            m.html(({ attrs, h }) => h('div', {}, attrs.name))
        );
        const parent = create(
            'x-parent',
            m.attrs({ name: type.String }),
            m.html(({ attrs, h }) =>
                h('div', {}, [
                    h('span', {}, 'Hello'),
                    h(child, { name: attrs.name }),
                    h('span', {}, '!')
                ])
            )
        );
        t.is(
            await render(parent, { name: 'Maria' }),
            '<x-parent name="Maria" class="resolved"><div><span>Hello</span><x-child name="Maria" class="resolved"><div>Maria</div></x-child><span>!</span></div></x-parent>'
        );
    }
);
