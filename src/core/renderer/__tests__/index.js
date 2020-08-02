import test from 'ava';
import { renderTree } from '../index.js';
import { createVNode as h } from '../utils.js';

test('It should be able to handle the rendering of the tree on the server;', async (t) => {
    const node = await renderTree({ tree: h('div'), node: document.createElement('x-adam'), server: true });
    t.snapshot(node.outerHTML);
});

test('It should be able to handle the rendering of the tree on the client;', async (t) => {
    const node = await renderTree({ tree: h('div'), node: document.createElement('x-maria'), server: false });
    t.snapshot(node.outerHTML);
});
