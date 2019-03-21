import test from 'ava';
import {
    patch,
    h
} from 'https://cdn.jsdelivr.net/npm/superfine@6.0.1/src/index.js';
import * as u from '../utils.js';

test('It should be able to find the applicable nodes;', t => {
    const tree = h('todo-app', {}, [
        h('todo-head', { class: 'resolved' }),
        h('todo-body'),
        h('todo-foot')
    ]);

    const node = document.createElement('main');
    patch(undefined, tree, node);

    const nodes = u.findApplicableNodes(['todo-head', 'todo-body'], { node });
    t.is(nodes.length, 1);
    t.is(nodes[0].nodeName.toLowerCase(), 'todo-body');
});
