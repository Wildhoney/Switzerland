import test from 'ava';
import createQueue from '../index.js';

test('It should be able to get the current queue item;', (t) => {
    const queue = createQueue();
    const task = Promise.resolve();

    queue.push(task);
    t.is(queue.current(), task);
});

test('It should be able to drop tasks from the queue;', (t) => {
    const queue = createQueue();
    const tasks = {
        first: Promise.resolve(),
        second: Promise.resolve(),
        third: Promise.resolve(),
    };

    queue.push(tasks.first);
    queue.push(tasks.second);
    queue.push(tasks.third);

    t.is(queue.size(), 3);

    queue.drop(tasks.first);
    t.is(queue.size(), 2);

    queue.dropAll();
    t.is(queue.size(), 0);
});

test('It should be able to determine if the queue task item is invalid;', (t) => {
    const queue = createQueue();
    const task = Promise.resolve();

    t.true(queue.isInvalid(task));
    queue.push(task);
    t.false(queue.isInvalid(task));
});

test('It should be able to determine if the queue is empty;', (t) => {
    const queue = createQueue();
    const task = Promise.resolve();

    t.true(queue.isEmpty(task));
    queue.push(task);
    t.false(queue.isEmpty(task));
});
