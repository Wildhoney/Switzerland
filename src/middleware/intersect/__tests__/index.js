import test from 'ava';
import { spy } from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
import intersect, { observers } from '../index.js';

test.beforeEach(t => {
    observers.delete(defaultProps.node);
    const observe = (t.context.observer = spy());
    window.IntersectionObserver = class {
        observe() {
            return observe();
        }
    };
});

test.afterEach(() => {
    window.IntersectionObserver = undefined;
});

test('It should add them to add the node to the set;', t => {
    const m = intersect();
    t.false(observers.has(defaultProps.node));
    const newProps = m({ ...defaultProps, lifecycle: 'mounted' });
    t.true(observers.has(defaultProps.node));
    t.deepEqual(newProps, { ...defaultProps, lifecycle: 'mounted' });
});

test('It should observe only once per instance of node;', t => {
    const m = intersect();
    m({ ...defaultProps, lifecycle: 'mounted' });
    [1, 2, 3].map(() => m(defaultProps));
    t.is(t.context.observer.callCount, 1);
});
