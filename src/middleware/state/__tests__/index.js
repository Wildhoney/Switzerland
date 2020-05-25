import test from 'ava';
import { spy } from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
import { create, render, m } from '../../../index.js';
import * as u from '../utils.js';
import state from '../index.js';

test('It should be able to invoke the `useState` function;', (t) => {
    const useStateSpy = spy(u, 'useState');
    const m = state();
    m(defaultProps);
    t.is(useStateSpy.callCount, 1);
});

test('It should be able to gracefully handle being rendered to a string;', async (t) => {
    const component = create(
        'x-example',
        state(),
        m.html(({ state, h }) => {
            const [message] = state('Example');
            return h('div', {}, message);
        })
    );
    t.is(await render(component), '<x-example class="resolved"><div>Example</div></x-example>');
});
