import test from 'ava';
import sinon from 'sinon';
import * as R from 'ramda';
import * as hyper from 'hyperhtml';
import defaultProps from '../../../../tests/helpers/default-props.js';
import template from '../index.js';

test.beforeEach((t) => {
    t.context.viewSpy = sinon.spy(({ h }) => h`<section><header>Example</header></section>`);
    t.context.hyperStub = sinon.stub(hyper, 'default').returns(() => ({
        h: R.identity,
    }));
});

test('It should be able to invoke the view with the required props when connected;', async (t) => {
    const assertions = [
        { isConnected: true, callCount: 1 },
        { isConnected: false, callCount: 0 },
    ];

    for (const assertion of assertions) {
        const { isConnected, callCount } = assertion;
        const m = template(t.context.viewSpy);
        const props = {
            ...defaultProps,
            node: Object.create(defaultProps.node, {
                isConnected: { value: isConnected },
            }),
        };
        const newProps = await m(props);
        t.is(t.context.hyperStub.callCount, callCount);
        t.deepEqual(newProps, props);
        t.context.hyperStub.resetHistory();
    }
});
