import test from 'ava';
import { spy } from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
import * as u from '../utils.js';
import boundary from '../index.js';

test('It should be able to invoke the `createBoundary` function;', t => {
    const createBoundarySpy = spy(u, 'createBoundary');
    const m = boundary();
    m(defaultProps);
    t.is(createBoundarySpy.callCount, 1);
});
