import test from 'ava';
import * as u from '../utils.js';

test('It should be able to diff two arrays;', (t) => {
    t.deepEqual(u.difference([1, 2, 3, 4], [2, 4, 5, 6]), [5, 6]);
    t.deepEqual(u.difference([4], [2, 4, 5, 6]), [2, 5, 6]);
    t.deepEqual(u.difference([], [1, 2, 3]), [1, 2, 3]);
    t.deepEqual(u.difference([1, 2, 3], []), []);
    t.deepEqual(u.difference([], []), []);
});

test('It should able to drop the specified keys from the object;', (t) => {
    const model = u.drop(['name', 'age'])({
        name: 'Adam',
        age: 33,
        location: 'Watford, UK',
    });
    t.deepEqual(model, { location: 'Watford, UK' });
});

test('It should able to take the specified keys from the object;', (t) => {
    const model = u.take(['name', 'age'])({
        name: 'Adam',
        age: 33,
        location: 'Watford, UK',
    });
    t.deepEqual(model, { name: 'Adam', age: 33 });
});
