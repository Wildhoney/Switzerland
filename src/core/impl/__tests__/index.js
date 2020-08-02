import test from 'ava';
import sinon from 'sinon';
import { getWindow } from '../../../utils.js';
import { client, server } from '../index.js';

test.beforeEach((t) => {
    const dispatchEventThunk = sinon.spy();

    const spies = {
        setAttribute: sinon.spy(),
        removeAttribute: sinon.spy(),
        runComponent: sinon.spy(),
        dispatchEvent: sinon.spy(() => dispatchEventThunk),
        dispatchEventThunk,
    };

    class MockElement {
        setAttribute = spies.setAttribute;
        removeAttribute = spies.removeAttribute;
    }

    t.context.spies = spies;
    t.context.HTMLElement = MockElement;
});

test('It should be able to handle the `connectedCallback` method on the client;', (t) => {
    const { spies, HTMLElement } = t.context;

    const Swiss = client(HTMLElement, []);
    const instance = new Swiss();

    const stubs = { render: sinon.stub(instance, 'render') };

    instance.connectedCallback();
    t.true(stubs.render.calledWith({ lifecycle: 'mount' }));
    t.true(spies.setAttribute.calledWith('data-swiss', ''));

    stubs.render.reset();
});

test('It should be able to handle the `disconnectedCallback` method on the client;', (t) => {
    const { spies, HTMLElement } = t.context;

    const Swiss = client(HTMLElement, []);
    const instance = new Swiss();

    const stubs = { render: sinon.stub(instance, 'render') };

    instance.disconnectedCallback();
    t.true(stubs.render.calledWith({ lifecycle: 'unmount' }));
    t.true(spies.removeAttribute.calledWith('data-swiss'));

    stubs.render.reset();
});

test('It should be able to handle the rendering of the client component;', async (t) => {
    const { spies, HTMLElement } = t.context;

    const Swiss = client(HTMLElement, []);
    const instance = new Swiss();

    instance.utils = { runComponent: spies.runComponent, dispatchEvent: spies.dispatchEvent };

    await instance.render();

    t.is(spies.runComponent.callCount, 1);
    t.true(spies.runComponent.calledWith(instance, {}, []));
    t.true(spies.dispatchEventThunk.calledWith('@switzerland/resolved', { node: instance }));
});

test('It should be able to handle the rendering of the server component;', async (t) => {
    const { spies } = t.context;
    const window = global.window;

    delete global.window;
    await getWindow();

    const instance = server('x-example', []);

    instance.utils = { runComponent: spies.runComponent };

    const node = await instance.render({ firstName: 'Imogen', middleName: 'Vasilisa', surname: 'Timberlake' });
    t.snapshot(node.outerHTML);
    t.is(spies.runComponent.callCount, 1);
    t.true(spies.runComponent.calledWith(sinon.match.any, { server: true, lifecycle: 'mount' }, []));

    global.window = window;
});

test('It should be able to handle the rendering of the server component when extending an element;', async (t) => {
    const { spies } = t.context;
    const window = global.window;

    delete global.window;
    await getWindow();

    const instance = server('x-example', [], 'button');

    instance.utils = { runComponent: spies.runComponent };

    const node = await instance.render({});
    t.snapshot(node.outerHTML);

    global.window = window;
});

test.serial(
    'It should be able to handle the rendering of the server component by yielding the node on client;',
    async (t) => {
        const { spies } = t.context;

        const instance = server('x-example', []);

        instance.utils = { runComponent: spies.runComponent };

        await instance.render({});
        t.is(spies.runComponent.callCount, 0);
    }
);
