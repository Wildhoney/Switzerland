import test from 'ava';
import defaultProps from '../../../../tests/helpers/default-props.js';
import delay from '../index.js';

test('It should yield only after the specified milliseconds have passed;', async t => {
    const startTime = Date.now();
    const m = delay(100);
    const newProps = await m(defaultProps);
    const endTime = Date.now();
    t.true(endTime - startTime > 100);
    t.deepEqual(newProps, defaultProps);
});
