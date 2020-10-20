import test from 'ava';
import sinon from 'sinon';
import { create } from '../../../core/index.js';
import { getWindow } from '../../../utils.js';
import {
    createVNode as h,
    getVNodeFragment,
    getVNodeDOM,
    attachEventListeners,
    isEvent,
    detatchEventListeners,
} from '../utils.js';

test('It should be able to parse a basic vnode tree;', async (t) => {
    const main = h('section', {}, 'Hello Adam!');
    const node = await getVNodeDOM(main);
    t.snapshot(node.outerHTML);
});

test('It should be able to parse a vnode tree that begins with an array;', async (t) => {
    const main = [h('section', {}, 'Hello Adam!'), h('section', {}, 'Hello Maria!'), h('section', {}, 'Hello Imogen!')];
    t.plan(main.length);
    const nodes = await getVNodeDOM(main);
    nodes.forEach((node) => t.snapshot(node.outerHTML));
});

test('It should be able to parse a vnode tree with children;', async (t) => {
    const name = ({ name }) => h('li', {}, name);
    const main = h('ul', {}, [h(name, { name: 'Adam' }), h(name, { name: 'Maria' }), h(name, { name: 'Imogen' })]);
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
    function view({ use }) {
        const attrs = use.attributes();
        return h('div', {}, `Hello ${attrs.name}!`);
    }

    const Name = create('x-name', view);

    const main = h('section', {}, [h(Name, { name: 'Adam' }), h(Name, { name: 'Maria' }), h(Name, { name: 'Imogen' })]);
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
    const main = [h('section', {}, 'Hello Adam!'), h('section', {}, 'Hello Maria!'), h('section', {}, 'Hello Imogen!')];
    const nodes = await getVNodeDOM(main);
    const fragment = await getVNodeFragment(nodes);
    t.true(fragment instanceof window.DocumentFragment);
});

test('It should be able to determine when an event is actually an event;', (t) => {
    t.true(isEvent('onClick', () => {}));
    t.false(isEvent('onClick', {}));
    t.false(isEvent('click', () => {}));
});

test('It should be able to handle of attaching events to any given node;', (t) => {
    const node = document.createElement('x-imogen');
    node.addEventListener = sinon.spy();

    const click = () => {};
    const onClick = () => {};
    const onChange = {};
    attachEventListeners(h('button', { click, onClick, onChange }))(node);

    t.is(node.addEventListener.callCount, 1);
    t.true(node.addEventListener.calledWith('click', onClick));
});

test('It should be able to handle of detatching events from any given node;', (t) => {
    const node = document.createElement('x-imogen');
    node.addEventListener = sinon.spy();
    node.removeEventListener = sinon.spy();

    const onClick = () => {};
    attachEventListeners(h('button', { onClick }))(node);

    detatchEventListeners(node);
    t.is(node.removeEventListener.callCount, 1);
    t.true(node.removeEventListener.calledWith('click', onClick));
});
