import test from 'ava';
import { useFakeTimers } from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
import { create, render, m } from '../../../index.js';
import interval from '../index.js';

test.beforeEach((t) => {
    t.context.clock = useFakeTimers();
});

test.afterEach((t) => {
    t.context.clock.restore();
});

test.serial('It should invoke `render` every 10 milliseconds until unmounted;', async (t) => {
    const m = interval(10);
    const newMountProps = m({ ...defaultProps, lifecycle: 'mount' });
    t.is(defaultProps.render.callCount, 0);
    t.context.clock.tick(15);
    t.is(defaultProps.render.callCount, 1);
    t.context.clock.tick(10);
    t.is(defaultProps.render.callCount, 2);
    t.context.clock.tick(1);
    t.is(defaultProps.render.callCount, 2);
    const newUnmountProps = m({ ...defaultProps, lifecycle: 'unmount' });
    t.context.clock.tick(24);
    t.is(defaultProps.render.callCount, 2);
    t.deepEqual(await newMountProps, { ...defaultProps, lifecycle: 'mount' });
    t.deepEqual(await newUnmountProps, {
        ...defaultProps,
        lifecycle: 'unmount',
    });
});

test.serial('It should be able to gracefully handle being rendered to a string;', async (t) => {
    const component = create(
        'x-example',
        interval(10),
        m.html(({ h }) => h('div', {}, 'Example'))
    );
    t.is(await render(component), '<x-example class="resolved"><div>Example</div></x-example>');
});
