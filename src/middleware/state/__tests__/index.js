import test from 'ava';
import { spy } from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
import * as u from '../utils.js';
import state from '../index.js';

test('It should be able to invoke the `useState` function;', t => {
    const useStateSpy = spy(u, 'useState');
    const m = state();
    m(defaultProps);
    t.is(useStateSpy.callCount, 1);
});
