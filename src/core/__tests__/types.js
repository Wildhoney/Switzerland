import test from 'ava';
import * as type from '../types.js';

test('It should be able to parse String types;', t => {
    t.is(type.String('dinosaurs'), 'dinosaurs');
});

test('It should be able to parse Int types;', t => {
    t.is(type.Int('5'), 5);
    t.is(type.Int('2.5'), 2);
    t.is(type.Int('a'), NaN);
});

test.skip('It should be able to parse BigInt types;', t => {
    // t.is(type.BigInt('5'), 5n);
    // t.is(type.BigInt('a'), NaN);
});

test('It should be able to parse Float types;', t => {
    t.is(type.Float('5'), 5.0);
    t.is(type.Float('2.5'), 2.5);
    t.is(type.Float('a'), NaN);
});

test('It should be able to parse Bool types;', t => {
    t.is(type.Bool('True'), true);
    t.is(type.Bool('false'), false);
    t.is(type.Bool('1'), true);
    t.is(type.Bool('0'), false);
});

test.skip('It should be able to parse Date types;', t => {
    const date = type.Date('10-10-1985');
    t.is(date.getFullYear(), '1985');
    t.is(date.getMonth() + 1, '10');
    t.is(date.getDate(), '10');
});

test('It should be able to parse Array types;', t => {
    t.deepEqual(type.Array(type.Int)('1,2,3'), [1, 2, 3]);
    t.deepEqual(type.Array(type.Bool)('1,true,false'), [true, true, false]);
    t.deepEqual(type.Array(type.Float)('2.5, 3.7, 5'), [2.5, 3.7, 5.0]);
});

test('It should be able to parse Tuple types;', t => {
    t.deepEqual(type.Tuple(type.String, type.Int)('Adam,32'), ['Adam', 32]);
});
