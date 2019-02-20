import test from 'ava';
import { spy } from 'sinon';
import * as u from '../utils.js';

test('It should be able to set the correct event name;', t => {
    t.is(u.eventName, '@switzerland/update-state');
});

test('It should be able to create a patch `get` method for the `URLSearchParams`;', t => {
    const getF = spy();
    const types = {};
    const defaults = {};
    const patchF = u.createPatch(getF, types, defaults);
    patchF('name');
    t.is(getF.callCount, 1);
    t.true(getF.calledWith('name'));
});

test('It should be able to dispatch the event on the node;', t => {
    window.history.pushState = spy();
    const props = { utils: { dispatch: spy() } };
    const params = [1, 2, 3];
    u.changeState(props, 'pushState')(...params);
    t.is(window.history.pushState.callCount, 1);
    t.true(window.history.pushState.calledWith(...params));
    t.is(props.utils.dispatch.callCount, 1);
    t.true(props.utils.dispatch.calledWith(u.eventName, { params }));
});
