import test from 'ava';
import name from '../index.js';

test('It should be able to create the roll-dice node;', t => {
    t.is(name, 'roll-dice');
});
