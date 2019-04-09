import test from 'ava';
import { spy, match } from 'sinon';
import * as R from 'ramda';
import defaultProps from '../../../../tests/helpers/default-props.js';
import redux, { nodes } from '../index.js';

test.beforeEach(t => {
    t.context.reducer = spy();
    t.context.actions = { test: R.identity };
});

test.afterEach(() => {
    defaultProps.render.resetHistory();
    nodes.delete(defaultProps.node);
});

test('It should be able to bind the actions to the dispatch;', t => {
    const { reducer, actions } = t.context;
    const m = redux(reducer, actions);
    const newProps = m(defaultProps);

    t.is(reducer.callCount, 1);
    newProps.redux.actions.test({ type: 'test' });
    t.is(reducer.callCount, 2);
    t.true(reducer.calledWith(match.any, { type: 'test' }));
});

test.serial('It should be able to invoke the `render` function on update;', t => {
    const { reducer, actions } = t.context;
    const m = redux(reducer, actions);
    const newProps = m(defaultProps);

    t.is(defaultProps.render.callCount, 0);
    newProps.redux.actions.test({ type: 'test' });
    t.is(defaultProps.render.callCount, 1);
});

test('It should be able to yield the necessary props;', t => {
    const { reducer, actions } = t.context;
    const m = redux(reducer, actions);
    const newProps = m(defaultProps);

    t.deepEqual(newProps, { ...defaultProps, redux: newProps.redux });
});

test.serial('It should only subscribe once to the updates per node instance;', t => {
    nodes.add = spy(nodes.add);

    const iterations = Math.floor(Math.random() * 5) + 5;
    for (let index = 0; index <= iterations; index++) {
        const { reducer, actions } = t.context;
        const m = redux(reducer, actions);
        m(defaultProps);
    }

    t.is(nodes.add.callCount, 1);
    t.true(nodes.has(defaultProps.node));
});
