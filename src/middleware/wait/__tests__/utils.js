import test from 'ava';
import { spy } from 'sinon';
import { patch, h } from 'https://cdn.jsdelivr.net/npm/superfine@6.0.1/src/index.js';
import * as u from '../utils.js';

test('It should be able to find the applicable nodes;', t => {
    const tree = h('todo-app', {}, [
        h('todo-head', { class: 'resolved' }),
        h('todo-body'),
        h('todo-foot')
    ]);
    const node = document.createElement('main');
    patch(undefined, tree, node);

    const nodes = u.findApplicableNodes(['todo-head', 'todo-body'], { node });
    t.is(nodes.length, 1);
    t.is(nodes[0].nodeName.toLowerCase(), 'todo-body');
});

test('It should be able to attach the event listener and handle resolutions;', t => {
    const eventName = '@switzerland/resolve';
    const addEventListenerSpy = spy(document, 'addEventListener');
    const removeEventListenerSpy = spy(document, 'removeEventListener');
    const resolveSpy = spy();

    const resolutions = new Set();
    const todoHead = document.createElement('todo-head');
    const todoBody = document.createElement('todo-body');
    const todoFoot = document.createElement('todo-foot');

    u.attachEventListener(eventName, [todoHead, todoFoot], resolutions, resolveSpy);
    t.is(addEventListenerSpy.callCount, 1);

    document.dispatchEvent(new window.CustomEvent(eventName, { detail: { node: todoFoot } }));
    t.is(removeEventListenerSpy.callCount, 0);
    t.true(resolutions.has(todoFoot));
    t.is(resolutions.size, 1);

    document.dispatchEvent(new window.CustomEvent(eventName, { detail: { node: todoBody } }));
    t.is(removeEventListenerSpy.callCount, 0);
    t.false(resolutions.has(todoBody));
    t.is(resolutions.size, 1);

    document.dispatchEvent(new window.CustomEvent(eventName, { detail: { node: todoHead } }));
    t.is(removeEventListenerSpy.callCount, 1);
    // When the last node has been resolved, the clear up takes place.
    t.false(resolutions.has(todoHead));
    t.is(resolutions.size, 0);
    t.is(resolveSpy.callCount, 1);

    document.addEventListener.restore();
    document.removeEventListener.restore();
});
