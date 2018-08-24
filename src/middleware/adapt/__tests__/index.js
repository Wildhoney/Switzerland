import test from 'ava';
import adapt, { observers } from '../index.js';
import defaultProps from '../../../../tests/helpers/default-props.js';

test('It should return the passed props;', t => {
    const m = adapt();
    const newProps = m(defaultProps);
    t.deepEqual(defaultProps, newProps);
});

test('It should add them to the `WeakSet`;', t => {
    observers.delete(defaultProps.node);
    const m = adapt();
    t.false(observers.has(defaultProps.node));
    m(defaultProps);
    t.true(observers.has(defaultProps.node));
});
