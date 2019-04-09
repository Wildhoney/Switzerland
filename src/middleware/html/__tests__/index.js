import test from 'ava';
import withComponent from 'ava-webcomponents';
import * as superfine from 'https://cdn.jsdelivr.net/npm/superfine@6.0.1/src/index.js';
import { spy, stub, match } from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
import html from '../index.js';
import * as u from '../utils.js';

test.beforeEach(t => {
    t.context.viewSpy = spy(() => superfine.h('div'));
    t.context.patchStub = stub(superfine, 'patch');
    t.context.recycleStub = stub(superfine, 'recycle');
});

test.afterEach(t => {
    t.context.patchStub.restore();
    t.context.recycleStub.restore();
});

test.serial('It should only patch the tree when the node is connected to the DOM;', async t => {
    const assertions = [{ isConnected: true, callCount: 1 }, { isConnected: false, callCount: 0 }];

    return Promise.all(
        assertions.map(async ({ isConnected, callCount }) => {
            const m = html(t.context.viewSpy);
            const props = {
                ...defaultProps,
                node: Object.create(defaultProps.node, {
                    isConnected: { value: isConnected }
                })
            };
            const newProps = await m(props);
            t.is(t.context.patchStub.callCount, callCount);
            t.deepEqual(newProps, props);
            t.context.patchStub.resetHistory();
        })
    );
});

test.serial('It should be able to pass the necessary props to the `getView` function;', async t => {
    const m = html(t.context.viewSpy);
    const props = {
        ...defaultProps,
        node: Object.create(defaultProps.node, {
            isConnected: { value: true }
        })
    };
    await m(props);
    const newProps = { ...props, h: match.func };
    newProps.props = newProps;
    t.true(t.context.viewSpy.calledWith(newProps));
    t.context.patchStub.resetHistory();
});

test.serial('It should be able to remove previous style resolutions;', async t => {
    const m = html(t.context.viewSpy);
    const props = {
        ...defaultProps,
        node: Object.create(defaultProps.node, {
            isConnected: { value: true }
        })
    };
    const view = Symbol('mock-view');
    u.styles.set(props.node, view);
    t.is(u.styles.get(props.node), view);
    await m(props);
    t.is(u.styles.get(props.node), undefined);
});

test.serial('It should be able to recycle the existing node content;', async t => {
    const m = html(t.context.viewSpy, { recycle: true });
    const props = {
        ...defaultProps,
        node: Object.create(defaultProps.node, {
            isConnected: { value: true }
        })
    };
    await m(props);
    t.is(t.context.recycleStub.callCount, 1);
    t.is(t.context.viewSpy.callCount, 1);
});

test(
    'It should be able to render the node and update with the merge props and respond to events;',
    withComponent(`${__dirname}/helpers/mock.js`),
    async (t, { page, utils }) => {
        const name = 'x-example';
        await utils.waitForUpgrade(name);

        await page.evaluate(name => {
            const node = document.createElement(name);
            document.body.append(node);
            return node.idle();
        }, name);

        t.snapshot(await utils.innerHTML(name));

        {
            const content = await page.evaluate(async name => {
                const node = document.querySelector(name);
                await node.render({ name: 'Maria' });
                return node.innerHTML;
            }, name);
            t.snapshot(content, utils.innerHTML(name));
        }

        await page.click(`${name} div`);
        t.snapshot(await utils.innerHTML(name));

        await page.type(`${name} input`, 'Maria', { delay: 15 });
        await page.click(`${name} button`);
        t.snapshot(await utils.innerHTML(name));
    }
);

test.serial(
    'It should be able to recycle the HTML from a node if specified in the options;',
    withComponent(`${__dirname}/helpers/mock.js`),
    async (t, { page, utils }) => {
        const name = 'x-example-recycled';

        await page.evaluate(name => {
            const node = document.createElement(name);
            node.innerHTML = '<div>Hello Maria!</div>';
            document.body.append(node);
        }, name);
        await utils.waitForUpgrade(name);
        await page.evaluate(name => document.querySelector(name).idle(), name);

        t.snapshot(await utils.innerHTML(name));
    }
);
