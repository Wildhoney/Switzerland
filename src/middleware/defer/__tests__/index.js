import test from 'ava';
import { spy } from 'sinon';
import delay from 'delay';
import defaultProps from '../../../../tests/helpers/default-props.js';
import defer from '../index.js';

test('It should not invoke the function as the component is resolved;', async t => {
    const identity = spy();
    const resolved = () => Promise.resolve();
    const m = defer(identity, 10);
    m({ ...defaultProps, resolved });
    await delay(5);
    t.is(identity.callCount, 0);
});

test('It should invoke the function as the component is unresolved;', async t => {
    const identity = spy();
    const resolved = () => Promise.resolve();
    const m = defer(identity, 10);
    const newProps = m({ ...defaultProps, resolved });
    await delay(15);
    t.is(identity.callCount, 1);
    t.deepEqual(newProps, { ...defaultProps, resolved });
});
