import test from 'ava';
import { spy } from 'sinon';
import delay from 'delay';
import interval from '../index.js';
import defaultProps from '../../../../tests/helpers/default-props.js';

test('It should invoke `render` every 10 milliseconds until unmounted;', async t => {
    const render = spy();
    const [mountM, unmountM] = interval(10);
    const newMountProps = mountM({ ...defaultProps, render });
    t.is(render.callCount, 0);
    await delay(11);
    t.is(render.callCount, 1);
    await delay(11);
    t.is(render.callCount, 2);
    await delay(1);
    t.is(render.callCount, 2);
    const newUnmountProps = unmountM(defaultProps);
    await delay(27);
    t.is(render.callCount, 2);
    t.deepEqual(await newMountProps, { ...defaultProps, render });
    t.deepEqual(await newUnmountProps, defaultProps);
});
