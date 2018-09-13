import test from 'ava';
import rescue, { handler } from '../index.js';
import defaultProps from '../../../../tests/helpers/default-props.js';

test('It should be able to setup the rescue function for `catch`;', async t => {
    const f = () => {};
    const m = rescue(f);
    const newProps = m(defaultProps);
    t.deepEqual(newProps, { ...defaultProps, [handler]: f });
});
