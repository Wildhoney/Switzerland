import test from 'ava';
import { createStore } from 'redux';
import { spy } from 'sinon';
import redux from '../../src/middleware/redux';

function counter(state = 0, action) {

    switch (action.type) {

        case 'INCREMENT':
            return state + 1;

        case 'DECREMENT':
            return state - 1;

        default:
            return state;

    }

}

test('Should be able to manage state from Redux;', t => {

    const node = document.createElement('div');
    const store = createStore(counter);
    const dispatch = store.dispatch;
    const render = node.render = spy();

    t.deepEqual(redux(store)({ node, render }), { node, render, dispatch, redux: store.getState() });
    t.deepEqual(redux(store)({ node, render }), { node, render, dispatch, redux: 0 });

    dispatch({ type: 'INCREMENT' });
    t.deepEqual(redux(store)({ node, render }), { node, render, dispatch, redux: 1 });

    dispatch({ type: 'INCREMENT' });
    t.deepEqual(redux(store)({ node, render }), { node, render, dispatch, redux: 2 });

    dispatch({ type: 'DECREMENT' });
    t.deepEqual(redux(store)({ node, render }), { node, render, dispatch, redux: 1 });

    t.is(render.callCount, 3);

});

test('Should be able to use the handler function to determine update;', t => {

    const shouldUpdate = spy((props, prevProps) => {
        t.is(props, 1);
        t.is(prevProps, 0);
        return false;
    });

    const node = document.createElement('div');
    const store = createStore(counter);
    const dispatch = store.dispatch;
    const render = node.render = spy();

    t.deepEqual(redux(store, shouldUpdate)({ node, render }), { node, render, dispatch, redux: 0 });
    dispatch({ type: 'INCREMENT' });
    t.deepEqual(redux(store, shouldUpdate)({ node, render }), { node, render, dispatch, redux: 1 });

    t.is(render.callCount, 0);
    t.is(shouldUpdate.callCount, 1);

});
