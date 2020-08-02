import test from 'ava';
import R from 'ramda';
import sinon from 'sinon';
import * as utils from '../utils.js';
import { createVNode as h } from '../../renderer/utils.js';

test('It should be able to determine the initial props for the rendering process for server;', async (t) => {
    const node = document.createElement('x-imogen');

    const props = await utils.getInitialProps(node, { server: true });
    t.snapshot(R.dissoc('window')(props));
    t.true('window' in props);
});

test('It should be able to determine the initial props for the rendering process for client;', async (t) => {
    const node = document.createElement('x-imogen');

    const props = await utils.getInitialProps(node, { server: false, lifecycle: 'mount' });
    t.snapshot(R.dissoc('window')(props));
    t.true('window' in props);
});

test('It should be able to handle the dispatching of events;', (t) => {
    t.plan(4);

    const node = document.createElement('x-maria');

    node.dispatchEvent = sinon.spy((event) => t.snapshot(event.detail));

    const dispatchEvent = utils.dispatchEvent(node);

    dispatchEvent('x-name', { name: 'Maria!' });
    t.is(node.dispatchEvent.callCount, 1);

    dispatchEvent('x-name', 'Maria!');
    t.is(node.dispatchEvent.callCount, 2);
});

test('It should be able to create bound adapter functions using the props;', async (t) => {
    const adapter = sinon.spy(() => () => {});
    const props = { node: document.createElement('x-adam'), server: false };

    const boundAdapters = await utils.bindAdapters(props, { adapter });

    t.is(adapter.callCount, 1);
    t.true(adapter.calledWith(props));
    t.snapshot(boundAdapters);
});

test('It should be able to create bound nested adapter functions using the props;', async (t) => {
    const adapter = sinon.spy(() => () => {});
    const props = { node: document.createElement('x-adam'), server: false };

    const boundAdapters = await utils.bindAdapters(props, { nestedAdapter: { adapter } });

    t.is(adapter.callCount, 1);
    t.true(adapter.calledWith(props));
    t.snapshot(boundAdapters);
});

test('It should be able to make a passed object cyclic for use in infinitely destructuring props;', (t) => {
    const props = { name: 'Adam' };
    const cyclicProps = utils.makeCyclicProps(props);

    t.is(cyclicProps.name, 'Adam');
    t.is(cyclicProps.props.name, 'Adam');
    t.is(cyclicProps.props.props.name, 'Adam');
    t.is(cyclicProps.props.props.props.name, 'Adam');
});

test('It should be able to render the passed tree;', async (t) => {
    const runController = sinon.spy(() => ({ name: 'Adam' }));
    const runView = sinon.spy(({ name }) => h('section', {}, `Hi ${name}!`));

    const props = await utils.renderTree({
        boundAdapters: {},
        renderProps: { node: document.createElement('x-adam'), server: true },
        runController,
        runView,
    });

    t.is(runController.callCount, 1);
    t.is(runView.callCount, 1);
    t.snapshot(props);
});

test('It should be able to render the passed tree twice when the form is detected;', async (t) => {
    const runController = sinon.spy(() => ({}));
    const runView = sinon.spy(({ form }) => h('form', {}, JSON.stringify(form)));

    const props = await utils.renderTree({
        boundAdapters: {},
        renderProps: { node: document.createElement('x-adam'), server: true, form: {} },
        runController,
        runView,
    });

    t.is(runController.callCount, 2);
    t.is(runView.callCount, 2);
    t.snapshot(props);
});

test('It should be able to run the component;', async (t) => {
    const node = document.createElement('x-imogen');

    const runController = sinon.spy(() => ({}));
    const runView = sinon.spy(() => h('section'));

    const props = await utils.runComponent(node, { node, server: true }, [runController, runView]);

    t.is(runController.callCount, 1);
    t.is(runView.callCount, 1);
    t.snapshot(props);
});

test('It should be able to run the component and handle any errors that are thrown;', async (t) => {
    const node = document.createElement('x-imogen');

    const runController = sinon.spy(() => {
        throw new Error('Oh no!');
    });
    const runView = sinon.spy(() => h('section'));

    await t.throwsAsync(() => utils.runComponent(node, { node, server: true }, [runController, runView]), {
        instanceOf: Error,
        message: 'Oh no!',
    });
});
