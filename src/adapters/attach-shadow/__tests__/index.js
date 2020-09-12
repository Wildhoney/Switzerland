import test from 'ava';
import sinon from 'sinon';
import attachShadow, { boundaries } from '../index.js';

test('It should be able to attach the shadow boundary to the node for CSR;', (t) => {
    const spies = { attachShadow: sinon.spy() };
    const node = document.createElement('x-adam');
    node.attachShadow = spies.attachShadow;

    const run = attachShadow({ node, server: false, lifecycle: 'mount' });
    run();

    t.is(node.attachShadow.callCount, 1);
    t.true(node.attachShadow.calledWith({ mode: 'open', delegatesFocus: false, sheets: null }));
});

test('It should be able to memorise the boundary thunk for SSR;', (t) => {
    const spies = { attachShadow: sinon.spy() };
    const node = document.createElement('x-adam');
    node.attachShadow = spies.attachShadow;

    const run = attachShadow({ node, server: true, lifecycle: 'mount' });
    run();

    t.is(node.attachShadow.callCount, 0);
    t.true(boundaries.has(node));

    const tree = boundaries.get(node)();
    t.is(tree.name, 'swiss-template');
    t.deepEqual(tree.props, { shadowroot: 'open' });
    t.true(Array.isArray(tree.children));
});

test('It should be able to skip the attaching of the shadow root if the node is not mounting;', (t) => {
    const spies = { attachShadow: sinon.spy() };
    const node = document.createElement('x-adam');
    node.attachShadow = spies.attachShadow;

    const run = attachShadow({ node, server: false, lifecycle: 'update' });
    run();

    t.is(node.attachShadow.callCount, 0);
});
