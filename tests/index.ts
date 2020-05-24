import test from 'ava';
import { render, create, h, m, t as type } from '../src';

test('It should be able to render a simple component;', async (t) => {
    const people = create(
        'x-people',
        m.html(() =>
            h('ul', {}, [h('li', {}, 'Adam'), h('li', {}, 'Maria'), h('li', {}, 'Imogen')])
        )
    );

    t.is(
        await render(people),
        '<x-people><ul><li>Adam</li><li>Maria</li><li>Imogen</li></ul></x-people>'
    );
});

test('It should be able to render a simple component with functional children;', async (t) => {
    function person(name) {
        return h('li', {}, name);
    }

    const people = create(
        'x-people',
        m.html(() => h('ul', {}, [person('Adam'), person('Maria'), person('Imogen')]))
    );

    t.is(
        await render(people),
        '<x-people><ul><li>Adam</li><li>Maria</li><li>Imogen</li></ul></x-people>'
    );
});

test('It should be able to render a simple component with component children;', async (t) => {
    const person = create(
        'x-person',
        m.attrs({ name: type.String }),
        m.html(({ attrs }) => h('li', {}, attrs.name))
    );

    const people = create(
        'x-people',
        m.html(() =>
            h('ul', {}, [
                h(person, { name: 'Adam' }),
                h(person, { name: 'Maria' }),
                h(person, { name: 'Imogen' }),
            ])
        )
    );

    t.is(
        await render(people),
        `<x-people><ul><x-person name="Adam"><li>Adam</li></x-person><x-person name="Maria"><li>Maria</li></x-person><x-person name="Imogen"><li>Imogen</li></x-person></ul></x-people>`
    );
});
