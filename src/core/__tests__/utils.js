import test from 'ava';
import { spy } from 'sinon';
import * as u from '../utils.js';
import * as type from '../../types/index.js';

test.beforeEach(() => {
    window.crypto = { getRandomValues: () => {} };
});

test.afterEach(() => {
    window.customElements = undefined;
});

test('It should be able to set the event name;', t => {
    t.is(u.getEventName('test'), '@switzerland/test');
});

test('It should be able to recursively determine the component name;', t => {
    window.customElements = { get: () => false };
    t.is(u.findFreeTagName('x-example'), 'x-example');
    t.is(u.findFreeTagName('x-example', 'abc'), 'x-example-abc');
    window.customElements = { get: a => a === 'x-example' };
    t.is(u.findFreeTagName('x-example'), 'x-example-0');
});

test('It should be able to attach the shadow boundary to an element;', t => {
    const element = document.createElement('section');
    const sameElement = u.createShadowRoot(element);
    t.is(element, sameElement);
    const attachShadow = spy(() =>
        document.createElement('fake-shadow-boundary')
    );
    element.attachShadow = attachShadow;
    const shadowBoundary = u.createShadowRoot(element);
    t.is(attachShadow.callCount, 1);
    t.is(shadowBoundary.nodeName.toLowerCase(), 'fake-shadow-boundary');
});

test('It should be able to determine the prototype of a given element;', t => {
    t.is(u.determinePrototype('div'), window.HTMLDivElement);
    t.is(u.determinePrototype('span'), window.HTMLSpanElement);
    t.is(u.determinePrototype('section'), window.HTMLElement);
});

test('It should be able to dispatch the event with the node and version;', t => {
    const node = document.createElement('div');
    const dispatchEvent = spy();
    node.dispatchEvent = dispatchEvent;
    u.dispatchEvent(node)('test', { data: 'abc' });
    t.is(dispatchEvent.callCount, 1);
});

test('It should be able to yield an object of defaults;', t => {
    const defaults = u.getDefaults({
        name: 'Adam',
        age: [type.Int, 33],
        city: [type.String, 'Watford'],
        country: type.String
    });
    t.deepEqual(defaults, { age: 33, city: 'Watford' });
});
