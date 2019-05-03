import test from 'ava';
import { spy } from 'sinon';
import delay from 'delay';
import defaultProps from '../../../../tests/helpers/default-props.js';
import { create, render, m } from '../../../index.js';
import defer from '../index.js';

test('It should not invoke the function as the component is resolved;', async t => {
    const identity = spy();
    const isResolved = () => Promise.resolve();
    const m = defer(identity, 100);
    m({ ...defaultProps, utils: { isResolved } });
    await delay(5);
    t.is(identity.callCount, 0);
});

test('It should invoke the function as the component is unresolved;', async t => {
    const identity = spy();
    const isResolved = () => Promise.resolve();
    const m = defer(identity, 10);
    const newProps = m({ ...defaultProps, utils: { isResolved } });

    // Required because `identity` is invoked asynchronously by the `defer` middleware.
    await delay(100);

    t.is(identity.callCount, 1);
    t.deepEqual(newProps, { ...defaultProps, utils: { isResolved } });
});

test('It should be able to gracefully handle being rendered to a string;', async t => {
    const identity = spy();
    const component = create(
        'x-example',
        defer(identity, 10),
        m.html(({ h }) => h('div', {}, 'Example'))
    );
    t.is(await render(component), '<x-example class="resolved"><div>Example</div></x-example>');
});
