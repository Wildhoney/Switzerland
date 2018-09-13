import test from 'ava';
import { spy, useFakeTimers } from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
import interval from '../index.js';

test.beforeEach(t => {
    t.context.clock = useFakeTimers(); 
});

test.afterEach(t => {
    t.context.clock.restore();
});

test('It should invoke `render` every 10 milliseconds until unmounted;', async t => {
    const render = spy();
    const [mountM, unmountM] = interval(10);
    const newMountProps = mountM({ ...defaultProps, render });
    t.is(render.callCount, 0);
    t.context.clock.tick(15);
    t.is(render.callCount, 1);
    t.context.clock.tick(10);
    t.is(render.callCount, 2);
    t.context.clock.tick(1);
    t.is(render.callCount, 2);
    const newUnmountProps = unmountM(defaultProps);
    t.context.clock.tick(24);
    t.is(render.callCount, 2);
    t.deepEqual(await newMountProps, { ...defaultProps, render });
    t.deepEqual(await newUnmountProps, defaultProps);
});
