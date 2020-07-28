import test from 'ava';
import { create } from '../../../core/index.js';
import * as m from '../../../middleware/index.js';
import { getWindow } from '../../../utils.js';
import { createVNode as h, getVNodeFragment, getVNodeDOM } from '../utils.js';

test('It should be able to parse a basic vnode tree;', async (t) => {
    const main = h('section', {}, 'Hello Adam!');
    const node = await getVNodeDOM(main);
    t.snapshot(node.outerHTML);
});

test('It should be able to parse a vnode tree that begins with an array;', async (t) => {
    const main = [
        h('section', {}, 'Hello Adam!'),
        h('section', {}, 'Hello Maria!'),
        h('section', {}, 'Hello Imogen!'),
    ];
    t.plan(main.length);
    const nodes = await getVNodeDOM(main);
    nodes.forEach((node) => t.snapshot(node.outerHTML));
});

test('It should be able to parse a vnode tree with children;', async (t) => {
    const name = ({ name }) => h('li', {}, name);
    const main = h('ul', {}, [
        h(name, { name: 'Adam' }),
        h(name, { name: 'Maria' }),
        h(name, { name: 'Imogen' }),
    ]);
    const node = await getVNodeDOM(main);
    t.snapshot(node.outerHTML);
});

test('It should be able to parse a vnode tree with children that yield arrays;', async (t) => {
    const name = ({ name, age }) => [h('div', {}, name), h('div', {}, age)];
    const main = h('section', {}, [
        h(name, { name: 'Adam', age: 34 }),
        h(name, { name: 'Maria', age: 29 }),
        h(name, { name: 'Imogen', age: 0.9 }),
    ]);
    const node = await getVNodeDOM(main);
    t.snapshot(node.outerHTML);
});

test('It should be able to parse a vnode tree that yields a Swiss component;', async (t) => {
    const Name = create(
        'x-name',
        m.attrs(),
        m.html(({ attrs }) => h('div', {}, `Hello ${attrs.name}!`))
    );

    const main = h('section', {}, [
        h(Name, { name: 'Adam' }),
        h(Name, { name: 'Maria' }),
        h(Name, { name: 'Imogen' }),
    ]);
    const node = await getVNodeDOM(main);
    t.snapshot(node.outerHTML);
});

test('It should be able to parse a vnode tree with children that yield nested arrays;', async (t) => {
    const name = ({ name, age }) => [[[h('div', {}, name), h('div', {}, age)]]];
    const main = h('section', {}, [
        [h(name, { name: 'Adam', age: 34 })],
        [h(name, { name: 'Maria', age: 29 })],
        [h(name, { name: 'Imogen', age: 0.9 })],
    ]);
    const node = await getVNodeDOM(main);
    t.snapshot(node.outerHTML);
});

test('It should be able to parse a vnode tree with children that yield nested arrays as parameters;', async (t) => {
    const name = ({ name, age }) => [[[h('div', {}, name), h('div', {}, age)]]];
    const main = h(
        'section',
        {},
        h(name, { name: 'Adam', age: 34 }),
        h(name, { name: 'Maria', age: 29 }),
        h(name, { name: 'Imogen', age: 0.9 })
    );
    const node = await getVNodeDOM(main);
    t.snapshot(node.outerHTML);
});

test('It should be able to yield a document fragment of the parsed DOM tree;', async (t) => {
    const window = await getWindow();
    const main = [
        h('section', {}, 'Hello Adam!'),
        h('section', {}, 'Hello Maria!'),
        h('section', {}, 'Hello Imogen!'),
    ];
    const nodes = await getVNodeDOM(main);
    const fragment = await getVNodeFragment(nodes);
    t.true(fragment instanceof window.DocumentFragment);
});
