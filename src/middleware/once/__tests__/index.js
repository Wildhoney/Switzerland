import test from 'ava';
import { spy } from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
import once from '../index.js';

test('It should only invoke the function once per node instance;', async t => {
    const fn = spy(() => ({ name: 'Adam' }));
    const newProps = once(fn)(defaultProps);

    t.deepEqual(newProps, { ...defaultProps, name: 'Adam' });
    once(fn)(defaultProps);
    once(fn)(defaultProps);
    t.is(fn.callCount, 1);

    once(fn)({ ...defaultProps, node: document.createElement('div') });
    t.is(fn.callCount, 2);
});