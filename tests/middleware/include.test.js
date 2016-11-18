import test from 'ava';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { options } from '../../src/switzerland';
import include from '../../src/middleware/include';

test.beforeEach(t => {

    const node = document.createElement('div');
    node.isConnected = true;
    node.shadowRoot = document.createElement('fake-shadow-root');

    t.context.node = node;
    t.context.mockAdapter = new MockAdapter(axios);

});

test('Should be able to yield a promise by default;', t => {

    const { node, mockAdapter } = t.context;

    const stylesheet = '* { border: 1px solid green; }';
    mockAdapter.onGet('/first.css').reply(200, stylesheet);

    t.falsy(include(['/first.css'], options.ASYNC)({ node }) instanceof Promise);
    t.true(include(['/first.css'])({ node }) instanceof Promise);

});

test('Should be able to include external documents', t => {

    const { node, mockAdapter } = t.context;

    return new Promise(resolve => {

        const firstStylesheet = '* { border: 1px solid green }';
        const secondStylesheet = '* { border: 1px solid orange }';
        const thirdStylesheet = `* { background-image: url('../images/example.png'), content: url('../images/example.png') }`;

        mockAdapter.onGet('/first.css').reply(200, firstStylesheet);
        mockAdapter.onGet('/second.css').reply(200, secondStylesheet);
        mockAdapter.onGet('/components/css/third.css').reply(200, thirdStylesheet);
        mockAdapter.onGet('/fourth.css').reply(404);

        const files = ['/first.css', '/second.css', '/components/css/third.css', '/fourth.css'];
        const props = include([...files], options.ASYNC)({ node });

        t.deepEqual(props, { node });
        t.true(node.classList.contains('resolving'));

        setTimeout(() => {

            // Should be updating the path to make the CSS paths relative to the CSS document.
            const thirdStylesheet = `* { background-image: url('/components/css/../images/example.png'), content: url('/components/css/../images/example.png') }`;

            t.deepEqual(props, { node });
            t.true(node.classList.contains('resolved'));
            t.is(node.shadowRoot.querySelector('style').innerHTML, `${firstStylesheet} ${secondStylesheet} ${thirdStylesheet}`);
            resolve();

        });

    });

});
