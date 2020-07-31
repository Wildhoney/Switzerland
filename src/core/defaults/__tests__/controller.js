import test from 'ava';
import sinon from 'sinon';
import controller from '../controller.js';

test('It should be able to initialise the default controller;', (t) => {
    const adapter = {
        attachShadow: sinon.spy(),
        useAttrs: sinon.spy(() => null),
        useHistory: sinon.spy(() => null),
    };

    const props = controller({ adapter });

    t.is(adapter.attachShadow.callCount, 1);
    t.is(adapter.useAttrs.callCount, 1);
    t.is(adapter.useHistory.callCount, 1);

    t.deepEqual(props, { attrs: null, history: null });
});
