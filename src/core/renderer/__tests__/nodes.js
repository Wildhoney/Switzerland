import test from 'ava';
import { Sheet, Variables, Fragment } from '../nodes.js';
import { createVNode as h } from '../utils.js';

test('It should be able to create a link node;', (t) => {
    const sheet = Sheet({ href: 'example.png' });
    t.snapshot(sheet);

    {
        const sheet = Sheet({ href: 'example.png', media: '(min-width: 1024px)' });
        t.snapshot(sheet);
    }
});

test('It should be able to create a CSS variable node;', (t) => {
    const variables = Variables({ firstName: 'Imogen', middleName: 'Vasilisa', surname: 'Timberlake', age: 0 });
    t.snapshot(variables);
});

test('It should be able to create a fragment node;', (t) => {
    const fragment = Fragment({ children: [h('div'), h('div'), h('div')] });
    t.snapshot(fragment);

    {
        const fragment = Fragment({ first: h('div'), second: h('div'), third: h('div') });
        t.snapshot(fragment);
    }
});
