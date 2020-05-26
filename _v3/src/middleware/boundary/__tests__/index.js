import test from 'ava';
import withComponent from 'ava-webcomponents';
import sinon from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
import { create, render, m } from '../../../index.js';
import * as u from '../utils.js';
import boundary from '../index.js';

test('It should be able to invoke the `createBoundary` function;', (t) => {
    const createBoundarySpy = sinon.spy(u, 'createBoundary');
    const m = boundary();
    m(defaultProps);
    t.is(createBoundarySpy.callCount, 1);
});

test(
    'It should be able to attach and reuse the shadow boundary;',
    withComponent(`${__dirname}/helpers/mock.js`),
    async (t, { page, utils }) => {
        const name = 'x-example';
        await utils.waitForUpgrade(name);

        const hasBoundary = await page.evaluate(async (name) => {
            const node = document.createElement(name);
            document.body.append(node);
            await node.idle();
            window.lastShadowRoot = node.shadowRoot;
            return Boolean(node.shadowRoot);
        }, name);

        t.true(hasBoundary);

        const hasSameBoundary = await page.evaluate(async (name) => {
            const node = document.querySelector(name);
            await node.render();
            return node.shadowRoot === window.lastShadowRoot;
        }, name);

        t.true(hasSameBoundary);
    }
);

test('It should be able to gracefully handle being rendered to a string;', async (t) => {
    const component = create(
        'x-example',
        boundary(),
        m.html(({ h }) => h('div', {}, 'Example'))
    );

    t.is(await render(component), '<x-example class="resolved"><div>Example</div></x-example>');
});
