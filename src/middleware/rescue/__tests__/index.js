import test from 'ava';
import defaultProps from '../../../../tests/helpers/default-props.js';
import { create, render, m } from '../../../index.js';
import rescue, { handler } from '../index.js';

test('It should be able to setup the rescue function for `catch`;', async t => {
    const f = () => {};
    const m = rescue(f);
    const newProps = await m(defaultProps);
    t.deepEqual(newProps, { ...defaultProps, [handler]: f });
});

test('It should be able to gracefully handle being rendered to a string;', async t => {
    const component = create(
        'x-example',
        rescue(m.html(({ error, h }) => h('div', {}, error.message))),
        () => {
            throw new Error('Example');
        }
    );
    t.is(await render(component), '<x-example class="resolved"><div>Example</div></x-example>');
});
