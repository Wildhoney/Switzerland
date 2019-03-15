import test from 'ava';
import { spy } from 'sinon';
import { meta } from '../../../core/utils.js';
import * as u from '../utils.js';

test('It should be able to attach the shadow boundary to an element;', t => {
    const element = document.createElement('section');
    element[meta] = { boundary: null };

    const attachShadow = spy(element.attachShadow);
    element.attachShadow = attachShadow;

    const root = u.createBoundary(element);
    t.is(attachShadow.callCount, 1);
    t.true(root instanceof window.ShadowRoot);
    t.true(element[meta].boundary instanceof window.ShadowRoot);

    const root_ = u.createBoundary(element);
    t.is(element[meta].boundary, root);
    t.is(element[meta].boundary, root_);
});

test('It should be able to return the element when attaching the shadow errors;', t => {
    const element = document.createElement('section');
    element.attachShadow = null;
    const sameElement = u.createBoundary(element);
    t.is(element, sameElement);
});
