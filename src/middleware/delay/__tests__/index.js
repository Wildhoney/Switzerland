import test from 'ava';
import defaultProps from '../../../../tests/helpers/default-props.js';
import { create, render, m } from '../../../index.js';
import delay from '../index.js';

test('It should yield only after the specified milliseconds have passed;', async (t) => {
    const startTime = Date.now();
    const m = delay(100);
    const newProps = await m(defaultProps);
    const endTime = Date.now();
    t.true(endTime - startTime >= 100);
    t.deepEqual(newProps, defaultProps);
});

test('It should be able to gracefully handle being rendered to a string;', async (t) => {
    const component = create(
        'x-example',
        delay(10),
        m.html(({ h }) => h('div', {}, 'Example'))
    );
    t.is(await render(component), '<x-example class="resolved"><div>Example</div></x-example>');
});
