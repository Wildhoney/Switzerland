import test from 'ava';
import createState from '../index.js';

test('It should be able to cycle through the various states;', (t) => {
    const state = createState(document.createElement('x-view'));

    t.false(state.isError());
    state.setError();
    t.true(state.isError());
    state.setNormal();
    t.false(state.isError());
});
