import test from 'ava';
import capitalise from 'capitalize';
import * as type from '../index.js';

test('It should be able to parse String types;', t => {
    t.is(type.string('dinosaurs'), 'dinosaurs');
});

test('It should be able to parse Int types;', t => {
    t.is(type.int('0'), 0);
    t.is(type.int('5'), 5);
    t.is(type.int('2.5'), 2);
    t.is(type.int('a'), null);
});

test('It should be able to parse BigInt types;', t => {
    window.BigInt = global.BigInt;
    t.is(type.bigInt('0'), global.BigInt(0));
    t.is(type.bigInt('1'), global.BigInt(1));
    t.is(type.bigInt('5'), global.BigInt(5));
    t.is(type.bigInt('104'), global.BigInt(104));
    t.is(type.bigInt('a'), null);
    window.BigInt = undefined;
});

test('It should be able to parse Float types;', t => {
    t.is(type.float('0'), 0.0);
    t.is(type.float('5'), 5.0);
    t.is(type.float('2.5'), 2.5);
    t.is(type.float('a'), null);
});

test('It should be able to parse Float.DP types;', t => {
    t.is(type.float.dp(1)('0.0'), 0.0);
    t.is(type.float.dp(2)('1.732493'), 1.73);
    t.is(type.float.dp(4)('2.5989102'), 2.5989);
    t.is(type.float.dp(6)('a'), null);
});

test('It should be able to parse Bool types;', t => {
    t.plan(25);

    const truthies = ['true', '1', 'yes', 'on'];
    const falsies = ['false', '0', 'no', 'off'];

    truthies.forEach(value => {
        t.true(type.bool(value));
        t.true(type.bool(value.toUpperCase()));
        t.true(type.bool(capitalise(value)));
    });

    falsies.forEach(value => {
        t.false(type.bool(value));
        t.false(type.bool(value.toUpperCase()));
        t.false(type.bool(capitalise(value)));
    });

    t.is(type.bool('unknown'), null);
});

test('It should be able to parse Date types;', t => {
    window.Date = global.Date;
    const date = type.date('10-10-1985');
    t.is(date.getFullYear(), 1985);
    t.is(date.getMonth() + 1, 10);
    t.is(date.getDate(), 10);
    t.is(type.date('a'), null);
    window.Date = undefined;
});

test('It should be able to parse Array types;', t => {
    t.deepEqual(type.array(type.int)('1,2,3'), [1, 2, 3]);
    t.deepEqual(type.array(type.bool)('1,true,false'), [true, true, false]);
    t.deepEqual(type.array(type.float)('2.5, 3.7, 5'), [2.5, 3.7, 5.0]);
    t.deepEqual(type.array()('1,2,3'), ['1', '2', '3']);
});

test('It should be able to parse Tuple types;', t => {
    t.deepEqual(type.tuple(type.string, type.int)('Adam,32'), ['Adam', 32]);
    t.deepEqual(type.tuple(type.string, type.int, type.float)('Adam,32,5.10'), [
        'Adam',
        32,
        5.1
    ]);
    t.deepEqual(type.tuple()('Adam,32'), ['Adam', '32']);
});

test('It should be able to parse Regex types;', t => {
    const r = /(?<day>\d+)-(?<month>\d+)(?:-(?<year>\d+))?/;
    t.deepEqual(type.regex(r)('10-10-1985'), {
        day: '10',
        month: '10',
        year: '1985'
    });
    t.deepEqual(type.regex(r)('10-10'), {
        day: '10',
        month: '10',
        year: null
    });
    t.deepEqual(type.regex(r)('Adam'), {
        day: null,
        month: null,
        year: null
    });
    t.deepEqual(type.regex(r, type.int)('10-10-1985'), {
        day: 10,
        month: 10,
        year: 1985
    });
});
