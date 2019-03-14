import test from 'ava';
import { spy } from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
import * as u from '../utils.js';
import boundary from '../index.js';

test('It should be able to invoke the `createBoundary` function;', t => {
    const createBoundarySpy = spy(u, 'createBoundary');
    const m = boundary();
    m(defaultProps);
    t.is(createBoundarySpy.callCount, 1);
});

test('It should be able to attach the shadow boundary to an element;', t => {
    const element = document.createElement('section');
    const attachShadow = spy(element.attachShadow);
    element.attachShadow = attachShadow;
    const shadowBoundary = u.createBoundary(element);
    t.is(attachShadow.callCount, 1);
    t.true(shadowBoundary instanceof window.ShadowRoot);
});

test('It should be able to return the element when attaching the shadow errors;', t => {
    const element = document.createElement('section');
    element.attachShadow = null;
    const sameElement = u.createBoundary(element);
    t.is(element, sameElement);
});
