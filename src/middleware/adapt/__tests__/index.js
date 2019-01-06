import test from 'ava';
import { spy } from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
import adapt, { nodes } from '../index.js';

test.beforeEach(t => {
    nodes.delete(defaultProps.node);
    const observe = (t.context.observer = spy());
    window.ResizeObserver = class {
        observe() {
            return observe();
        }
    };
});

test.afterEach(() => {
    window.ResizeObserver = undefined;
});

test('It should add them to add the node to the set;', t => {
    const m = adapt();
    t.false(nodes.has(defaultProps.node));
    const newProps = m({ ...defaultProps, lifecycle: 'mount' });
    t.true(nodes.has(defaultProps.node));
    t.deepEqual(newProps, { ...defaultProps, lifecycle: 'mount' });
});

test('It should observe only once per instance of node;', t => {
    const m = adapt();
    m({ ...defaultProps, lifecycle: 'mount' });
    [1, 2, 3].map(() => m(defaultProps));
    t.is(t.context.observer.callCount, 1);
});
