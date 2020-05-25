import test from 'ava';
import withComponent from 'ava-webcomponents';
import { patch, h } from 'https://cdn.jsdelivr.net/npm/superfine@6.0.1/src/index.js';
import defaultProps from '../../../../tests/helpers/default-props.js';
import { create, render, m } from '../../../index.js';
import { getEventName } from '../../../core/utils.js';
import wait from '../index.js';

test('It should continue immediately if there are no applicable nodes;', async (t) => {
    const m = wait('todo-head', 'todo-body', 'todo-foot');
    const newProps = await m(defaultProps);
    t.deepEqual(defaultProps, newProps);
});

test('It should be able to wait for the resolution of applicable nodes;', async (t) => {
    const eventName = getEventName('resolved');

    let todoFoot;
    const tree = h('todo-app', {}, [
        h('todo-head', { class: 'resolved' }),
        h('todo-body'),
        h('todo-foot', { oncreate: (node) => (todoFoot = node) }),
    ]);
    const node = document.createElement('main');
    patch(undefined, tree, node);

    const m = wait('todo-head', 'todo-foot');
    const newProps = m(defaultProps);
    document.dispatchEvent(new window.CustomEvent(eventName, { detail: { node: todoFoot } }));

    t.deepEqual(defaultProps, await newProps);
});

test('It should be able to gracefully handle being rendered to a string;', async (t) => {
    const component = create(
        'x-example',
        wait('x-another-example', 'x-and-yet-another-example'),
        m.html(({ h }) => h('div', {}, 'Example'))
    );
    t.is(await render(component), '<x-example class="resolved"><div>Example</div></x-example>');
});

test(
    'It should be able to wait for the child nodes to render;',
    withComponent(`${__dirname}/helpers/mock.js`),
    async (t, { page, utils }) => {
        const name = 'x-example';
        await utils.waitForUpgrade(name);

        await page.evaluate((name) => {
            const node = document.createElement(name);
            document.body.append(node);
            return node.idle();
        }, name);

        t.snapshot(await utils.innerHTML(name));
    }
);
