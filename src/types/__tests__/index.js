import test from 'ava';
import capitalise from 'capitalize';
import * as R from 'ramda';
import * as type from '../index.js';

test('It should be able to parse String types;', (t) => {
    t.is(type.String('dinosaurs'), 'dinosaurs');
});

test('It should be able to parse Int types;', (t) => {
    t.is(type.Int('0'), 0);
    t.is(type.Int('5'), 5);
    t.is(type.Int('2.5'), 2);
    t.is(type.Int('a'), null);
});

test('It should be able to parse BigInt types;', (t) => {
    window.BigInt = global.BigInt;
    t.is(type.BigInt('0'), global.BigInt(0));
    t.is(type.BigInt('1'), global.BigInt(1));
    t.is(type.BigInt('5'), global.BigInt(5));
    t.is(type.BigInt('104'), global.BigInt(104));
    t.is(type.BigInt('a'), null);
    window.BigInt = undefined;
});

test('It should be able to parse Float types;', (t) => {
    t.is(type.Float('0'), 0.0);
    t.is(type.Float('5'), 5.0);
    t.is(type.Float('2.5'), 2.5);
    t.is(type.Float('a'), null);
});

test('It should be able to parse Float.DP types;', (t) => {
    t.is(type.Float.DP(1)('0.0'), 0.0);
    t.is(type.Float.DP(2)('1.732493'), 1.73);
    t.is(type.Float.DP(4)('2.5989102'), 2.5989);
    t.is(type.Float.DP(6)('a'), null);
});

test('It should be able to parse Bool types;', (t) => {
    t.plan(25);

    const truthies = ['true', '1', 'yes', 'on'];
    const falsies = ['false', '0', 'no', 'off'];

    truthies.forEach((value) => {
        t.true(type.Bool(value));
        t.true(type.Bool(value.toUpperCase()));
        t.true(type.Bool(capitalise(value)));
    });

    falsies.forEach((value) => {
        t.false(type.Bool(value));
        t.false(type.Bool(value.toUpperCase()));
        t.false(type.Bool(capitalise(value)));
    });

    t.is(type.Bool('unknown'), null);
});

test('It should be able to parse Date types;', (t) => {
    window.Date = global.Date;
    const date = type.Date('10-10-1985');
    t.is(date.getFullYear(), 1985);
    t.is(date.getMonth() + 1, 10);
    t.is(date.getDate(), 10);
    t.is(type.Date('a'), null);
    window.Date = undefined;
});

test('It should be able to parse Array types;', (t) => {
    t.deepEqual(type.Array(type.Int)('1,2,3'), [1, 2, 3]);
    t.deepEqual(type.Array(type.Bool)('1,true,false'), [true, true, false]);
    t.deepEqual(type.Array(type.Float)('2.5, 3.7, 5'), [2.5, 3.7, 5.0]);
    t.deepEqual(type.Array()('1,2,3'), ['1', '2', '3']);
});

test('It should be able to parse Tuple types;', (t) => {
    t.deepEqual(type.Tuple(type.String, type.Int)('Adam,32'), ['Adam', 32]);
    t.deepEqual(type.Tuple(type.String, type.Int, type.Float)('Adam,32,5.10'), ['Adam', 32, 5.1]);
    t.deepEqual(type.Tuple()('Adam,32'), ['Adam', '32']);
});

test('It should be able to parse Regex types;', (t) => {
    const r = /(?<day>\d+)-(?<month>\d+)(?:-(?<year>\d+))?/;
    t.deepEqual(type.Regex(r)('10-10-1985'), {
        day: '10',
        month: '10',
        year: '1985',
    });
    t.deepEqual(type.Regex(r)('10-10'), {
        day: '10',
        month: '10',
        year: null,
    });
    t.deepEqual(type.Regex(r)('Adam'), {
        day: null,
        month: null,
        year: null,
    });
    t.deepEqual(R.map(Number)(type.Regex(r)('10-10-1985')), {
        day: 10,
        month: 10,
        year: 1985,
    });
});
