import path from 'path';
import * as sf from 'https://cdn.jsdelivr.net/npm/superfine@6.0.1/src/index.js';
import test from 'ava';
import { spy, stub, match } from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
import withPage from '../../../../tests/helpers/puppeteer.js';
import html from '../index.js';
import * as u from '../utils.js';

test.beforeEach(t => {
    t.context.viewSpy = spy(() => sf.h('div'));
    t.context.patchStub = stub(sf, 'patch');
});

test.afterEach(t => {
    t.context.patchStub.restore();
});

test.serial(
    'It should only patch the tree when the node is connected to the DOM;',
    async t => {
        const assertions = [
            { isConnected: true, callCount: 1 },
            { isConnected: false, callCount: 0 }
        ];

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
    }
);

test.serial(
    'It should be able to pass the necessary props to the `getView` function;',
    async t => {
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
    }
);

test.serial(
    'It should be able to remove previous style resolutions;',
    async t => {
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
    }
);

test(
    'It should be able to render the node and update with the merge props;',
    withPage,
    async (t, puppeteer) => {
        const getMarkup = name =>
            `<main><div>Hello ${name}!</div><form><input type="text" name="value"><button type="submit"></button></form></main>`;

        const getHTML = () =>
            puppeteer.page.evaluate(
                () => document.querySelector('x-example').innerHTML
            );

        await puppeteer.read(path.resolve(__dirname, 'mock.md'));
        await puppeteer.load('x-example');

        t.is(await getHTML(), getMarkup('Adam'));

        {
            const content = await puppeteer.page.evaluate(async () => {
                const node = document.querySelector('x-example');
                await node.render({ name: 'Maria' });
                return node.innerHTML;
            });
            t.is(content, getMarkup('Maria'));
        }

        await puppeteer.page.click('x-example div');
        t.is(await getHTML(), getMarkup('Adam'));

        await puppeteer.page.type('x-example input', 'Maria');
        await puppeteer.page.click('x-example button');
        t.is(await getHTML(), getMarkup('Maria'));
    }
);
