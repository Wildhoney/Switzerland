import * as sf from 'https://cdn.jsdelivr.net/npm/superfine@6.0.1/src/index.js';
import test from 'ava';
import { spy, stub, match } from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
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
        return Promise.all(
            [
                { isConnected: true, callCount: 1 },
                { isConnected: false, callCount: 0 }
            ].map(async ({ isConnected, callCount }) => {
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
