import test from 'ava';
import sinon from 'sinon';
import dom from 'jsdom';
import * as u from '../utils.js';

test('It should be able to create a patch `get` method for the `URLSearchParams`;', (t) => {
    const getF = sinon.spy();
    const types = {};
    const defaults = {};
    const patchF = u.createPatch(getF, types, defaults);
    patchF('name');
    t.is(getF.callCount, 1);
    t.true(getF.calledWith('name'));
});

test('It should be able to dispatch the event on the node;', (t) => {
    const { window } = new dom.JSDOM();
    window.history.pushState = sinon.spy();
    const params = [1, 2, 3];
    u.changeState('pushState')(...params);
    t.is(window.history.pushState.callCount, 1);
    t.true(window.history.pushState.calledWith(...params));
});
