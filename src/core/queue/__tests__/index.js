import test from 'ava';
import createQueue from '../index.js';

const mockTask = Symbol('mock-task');

test('It should be able to determine the current task;', t => {
    const queue = createQueue();
    queue.push(mockTask);
    t.is(queue.current(), mockTask);
    [1, 2, 3].forEach(() => queue.push(mockTask));
    t.is(queue.current(), mockTask);
});

test('It should be able to drop tasks;', t => {
    const queue = createQueue();
    queue.push(mockTask);
    t.is(queue.current(), mockTask);
    queue.drop(mockTask);
    t.true(queue.isEmpty());
    [1, 2, 3].forEach(() => queue.push(mockTask));
    t.false(queue.isEmpty());
    queue.dropAll();
    t.true(queue.isEmpty());
});

test('It should be able to determine if the current task has become invalid;', t => {
    const queue = createQueue();
    t.true(queue.isInvalid(mockTask));
    queue.push(mockTask);
    t.false(queue.isInvalid(mockTask));
});

test('It should be able to calculate the size of the queue;', t => {
    const queue = createQueue();
    t.is(queue.size(), 0);
    queue.push(mockTask);
    t.is(queue.size(), 1);
});
