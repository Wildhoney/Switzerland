import test from 'ava';
import defaultProps from '../../../../tests/helpers/default-props.js';
import rescue, { handler } from '../index.js';

test('It should be able to setup the rescue function for `catch`;', async t => {
    const f = () => {};
    const m = rescue(f);
    const newProps = await m(defaultProps);
    t.deepEqual(newProps, { ...defaultProps, [handler]: f });
});
