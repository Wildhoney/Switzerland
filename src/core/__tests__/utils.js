import test from 'ava';
import sinon from 'sinon';
import * as u from '../utils.js';
import * as type from '../../types/index.js';

test.beforeEach(() => {
    window.crypto = { getRandomValues: () => {} };
});

test.afterEach(() => {
    window.customElements = undefined;
});

test('It should be able to set the event name;', (t) => {
    t.is(u.getEventName('test'), '@switzerland/test');
});

test('It should be able to recursively determine the component name;', (t) => {
    window.customElements = { get: () => false };
    t.is(u.findFreeTagName('x-example'), 'x-example');
    t.is(u.findFreeTagName('x-example', 'abc'), 'x-example-abc');
    window.customElements = { get: (a) => a === 'x-example' };
    t.is(u.findFreeTagName('x-example'), 'x-example-0');
});

test('It should be able to determine the prototype of a given element;', (t) => {
    t.is(u.determinePrototype('div'), window.HTMLDivElement);
    t.is(u.determinePrototype('span'), window.HTMLSpanElement);
    t.is(u.determinePrototype('section'), window.HTMLElement);
});

test('It should be able to dispatch the event with the node and version;', (t) => {
    const node = document.createElement('div');
    const constructorSpy = sinon.spy();
    const dispatchEventSpy = sinon.spy();
    window.CustomEvent = function (name, options) {
        constructorSpy(name, options);
    };

    node.dispatchEvent = dispatchEventSpy;
    u.dispatchEvent(node)('test', { data: 'abc' });
    t.is(dispatchEventSpy.callCount, 1);
    t.true(
        constructorSpy.calledWith('test', {
            bubbles: true,
            composed: true,
            detail: { data: 'abc', version: 4 },
        })
    );
});

test('It should be able to yield an object of defaults;', (t) => {
    const defaults = u.getDefaults({
        name: 'Adam',
        age: [type.Int, 33],
        city: [type.String, 'Watford'],
        country: type.String,
    });
    t.deepEqual(defaults, { age: 33, city: 'Watford' });
});

test('It should be able to transform into camelCase from snake and kebab;', (t) => {
    t.is(u.toCamelcase('one-two').fromKebab(), 'oneTwo');
    t.is(u.toCamelcase('one_two').fromSnake(), 'oneTwo');
    t.is(u.toCamelcase('one').fromKebab(), 'one');
    t.is(u.toCamelcase('one+two').fromSnake(), 'one+two');
});

test('It should be able to find the boundary or node depending on their existence;', (t) => {
    const node = document.createElement('div');
    t.is(u.getBoundary(node), node);

    const boundary = node.attachShadow({ mode: 'open' });
    node.shadowRoot = boundary;
    t.is(u.getBoundary(node), boundary);

    delete node.shadowRoot;
    t.is(u.getBoundary(node), boundary);
});
