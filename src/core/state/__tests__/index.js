import test from 'ava';
import createState from '../index.js';

const mockNode = document.createElement('mock-element')

test('It should be able to determine the state;', t => {
    const state  = createState(mockNode);
    t.false(state.isError());
    state.setError();
    t.true(state.isError());
    state.setNormal();
    t.false(state.isError());
});