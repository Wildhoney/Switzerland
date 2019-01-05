import test from 'ava';
import defaultProps from '../../../../tests/helpers/default-props.js';
import blend from '../index.js';

test('It should be able to invoke the render once the promise has been resolved;', async t => {
    const promise = () =>
        new Promise(resolve => {
            resolve({ name: 'Adam' });
        });

    const m = blend(promise);
    m({ ...defaultProps, name: 'Maria' });

    t.is(defaultProps.render.callCount, 0);
    await promise;
    t.is(defaultProps.render.callCount, 1);
    t.true(defaultProps.render.calledWith({ name: 'Adam' }));
});