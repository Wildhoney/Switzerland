import { Transform } from 'stream';
import test from 'ava';
import sinon from 'sinon';
import { create, render, renderToStream, preload, rename, fetch } from '../index.js';
import { Swiss } from '../core/impl/index.js';

test('it should be able to create and rename a custom element;', (t) => {
    window.customElements = {
        define: sinon.spy(),
        get: sinon.spy(),
    };

    const a = create('x-name');
    t.true(a instanceof Swiss);
    t.is(a.name, 'x-name');

    t.is(window.customElements.get.callCount, 1);
    t.is(window.customElements.define.callCount, 1);

    t.true(window.customElements.get.calledWith('x-name'));
    t.true(window.customElements.define.calledWith('x-name', sinon.match.func, sinon.match.any));

    {
        window.customElements.get.resetHistory();
        window.customElements.define.resetHistory();

        const b = rename(a, 'x-another-name');

        t.true(b instanceof Swiss);
        t.is(b.name, 'x-another-name');

        t.is(window.customElements.get.callCount, 1);
        t.is(window.customElements.define.callCount, 1);

        t.true(window.customElements.get.calledWith('x-another-name'));
        t.true(window.customElements.define.calledWith('x-another-name', sinon.match.func, sinon.match.any));
    }
});

test('it should be able to render a component tree;', async (t) => {
    function view({ use }) {
        use.shadow();

        return 'Hi Imogen!';
    }

    const name = create('x-name', view);
    const html = await render(name);
    t.snapshot(html);

    const window = global.window;
    delete global.window;

    {
        const name = create('x-name', view);
        const html = await render(name);
        t.snapshot(html);
    }

    global.window = window;
});

test('It should be able to extract the stylesheets from a tree for preloading;', async (t) => {
    const html = `
<todo-app data-swiss="">
    <template shadowroot="open">
        <section class="todo-app">
            <todo-input data-swiss="">
                <template shadowroot="open">
                    <form>
                        <input
                            value=""
                            type="text"
                            name="todo"
                            required=""
                            minlength="3"
                            autofocus="on"
                            autocomplete="off"
                            placeholder="What do you need to do?"
                        /><button type="submit" class="add" disabled=""></button>
                    </form>
                    <link
                        key="http://localhost:3000/nodes/todo-input/styles/index.css"
                        rel="stylesheet"
                        type="text/css"
                        href="http://localhost:3000/nodes/todo-input/styles/index.css" /><link
                        key="http://localhost:3000/nodes/todo-input/styles/mobile.css"
                        rel="stylesheet"
                        type="text/css"
                        href="http://localhost:3000/nodes/todo-input/styles/mobile.css"
                        media="(max-width: 768px)" /><link
                        key="http://localhost:3000/nodes/todo-input/styles/print.css"
                        rel="stylesheet"
                        type="text/css"
                        href="http://localhost:3000/nodes/todo-input/styles/print.css"
                        media="print" /></template></todo-input
            ><todo-list data-swiss=""
                ><template shadowroot="open"
                    ><ul>
                        <li class="none"><p>Please wait for your todos to be fetched...</p></li>
                    </ul>
                    <link
                        key="http://localhost:3000/nodes/todo-list/styles/index.css"
                        rel="stylesheet"
                        type="text/css"
                        href="http://localhost:3000/nodes/todo-list/styles/index.css" /><link
                        key="http://localhost:3000/nodes/todo-list/styles/mobile.css"
                        rel="stylesheet"
                        type="text/css"
                        href="http://localhost:3000/nodes/todo-list/styles/mobile.css"
                        media="(max-width: 768px)" /><link
                        key="http://localhost:3000/nodes/todo-list/styles/print.css"
                        rel="stylesheet"
                        type="text/css"
                        href="http://localhost:3000/nodes/todo-list/styles/print.css"
                        media="print" /></template
            ></todo-list>
            <h1 part="header">
                <a href="https://github.com/Wildhoney/Switzerland"
                    ><img src="http://localhost:3000/nodes/todo-app/images/logo.png"
                /></a>
            </h1>
            <ul>
                <li><em>Logo: </em><a class="">Bottom</a><span> / </span><a class="active">Top</a></li>
                <li><em>Complete: </em><a class="active">Show</a><span> / </span><a class="">Hide</a></li>
                <li>Loading...</li>
            </ul>
        </section>
        <link
            key="http://localhost:3000/nodes/todo-app/styles/index.css"
            rel="stylesheet"
            type="text/css"
            href="http://localhost:3000/nodes/todo-app/styles/index.css"
        /><link
            key="http://localhost:3000/nodes/todo-app/styles/mobile.css"
            rel="stylesheet"
            type="text/css"
            href="http://localhost:3000/nodes/todo-app/styles/mobile.css"
            media="(max-width: 768px)"
        /><link
            key="http://localhost:3000/nodes/todo-app/styles/print.css"
            rel="stylesheet"
            type="text/css"
            href="http://localhost:3000/nodes/todo-app/styles/print.css"
            media="print"
        /><style type="text/css">
            :host {
                --order-position: -1;
                --border-colour: rgba(0, 0, 0, 0.1);
            }
        </style></template
    ></todo-app
>
    `;
    t.snapshot(await preload(html));
});

test('It should be able to render the component tree to a Node stream;', async (t) => {
    const window = global.window;
    delete global.window;

    const name = create('x-name');
    const reader = await renderToStream(name);
    t.true(reader instanceof Transform);

    global.window = window;
});

test('It should be able to resolve an async module and extract its default;', async (t) => {
    const p = Promise.resolve({ default: 'Adam' });
    t.is(await fetch(p), 'Adam');
});
