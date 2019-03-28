import path from 'path';
import test from 'ava';
import {
    patch,
    h
} from 'https://cdn.jsdelivr.net/npm/superfine@6.0.1/src/index.js';
import withPage from '../../../../tests/helpers/puppeteer.js';
import defaultProps from '../../../../tests/helpers/default-props.js';
import { getEventName } from '../../../core/utils.js';
import wait from '../index.js';

test('It should continue immediately if there are no applicable nodes;', async t => {
    const m = wait('todo-head', 'todo-body', 'todo-foot');
    const newProps = await m(defaultProps);
    t.deepEqual(defaultProps, newProps);
});

test('It should be able to wait for the resolution of applicable nodes;', async t => {
    const eventName = getEventName('resolved');

    let todoFoot;
    const tree = h('todo-app', {}, [
        h('todo-head', { class: 'resolved' }),
        h('todo-body'),
        h('todo-foot', { oncreate: node => (todoFoot = node) })
    ]);
    const node = document.createElement('main');
    patch(undefined, tree, node);

    const m = wait('todo-head', 'todo-foot');
    const newProps = m(defaultProps);
    document.dispatchEvent(
        new window.CustomEvent(eventName, { detail: { node: todoFoot } })
    );

    t.deepEqual(defaultProps, await newProps);
});

test(
    'It should be able to wait for the child nodes to render;',
    withPage,
    async (t, puppeteer) => {
        await puppeteer.read(path.resolve(__dirname, 'mock.md'));
        await puppeteer.load('x-example');

        const content = await puppeteer.page.evaluate(async () => {
            const node = document.querySelector('x-example');
            return node.innerHTML;
        });

        t.is(
            content,
            '<main><x-adam class="resolved"><div>Adam</div></x-adam><x-maria class="resolved"><div>Maria</div></x-maria></main>'
        );
    }
);
