import test from 'ava';
import { spy } from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
import intersect, { nodes } from '../index.js';

test.beforeEach(t => {
    nodes.delete(defaultProps.node);

    const observeSpy = spy();
    const unobserveSpy = spy();

    t.context.mockObserver = entries => {
        window.IntersectionObserver = function(f) {
            f(entries);
        };
        window.IntersectionObserver.prototype.observe = observeSpy;
        window.IntersectionObserver.prototype.unobserve = unobserveSpy;
        t.context.spies = { observeSpy, unobserveSpy };
    };
});

test.afterEach(() => {
    window.IntersectionObserver = undefined;
});

test.serial('It should add them to add the node to the set;', t => {
    t.context.mockObserver([]);
    const m = intersect();
    t.false(nodes.has(defaultProps.node));
    const newProps = m({ ...defaultProps, lifecycle: 'mount' });
    t.true(nodes.has(defaultProps.node));
    t.deepEqual(newProps, { ...defaultProps, lifecycle: 'mount' });
});

test.serial('It should observe only once per instance of node;', t => {
    t.context.mockObserver([]);
    const { observeSpy } = t.context.spies;
    const m = intersect();
    m({ ...defaultProps, lifecycle: 'mount' });
    [1, 2, 3].map(() => m(defaultProps));
    t.is(observeSpy.callCount, 1);
});

test.serial(
    'It should be able to toggle the observerable depending on the lifecycle;',
    t => {
        t.context.mockObserver([]);
        const { observeSpy, unobserveSpy } = t.context.spies;
        const m = intersect();
        m({ ...defaultProps, lifecycle: 'mount' });
        t.is(observeSpy.callCount, 1);
        m({ ...defaultProps, lifecycle: 'unmount' });
        t.is(unobserveSpy.callCount, 1);
    }
);

test.serial(
    'It should be able to invoke `render` for each observed component;',
    t => {
        const firstMock = document.createElement('div');
        const secondMock = document.createElement('div');
        const thirdMock = document.createElement('div');

        t.context.mockObserver([
            { target: firstMock, contentRect: {} },
            { target: thirdMock, contentRect: {} }
        ]);

        firstMock.render = spy();
        secondMock.render = spy();
        thirdMock.render = spy();

        const m = intersect();
        m({ ...defaultProps, lifecycle: 'mount' });
        t.is(firstMock.render.callCount, 1);
        t.is(secondMock.render.callCount, 0);
        t.is(thirdMock.render.callCount, 1);
    }
);
