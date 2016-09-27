import test from 'ava';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import include from '../../src/middleware/include';

test('Should be able to include external documents', t => {

    const node = document.createElement('div');
    node.isConnected = true;
    node.shadowRoot = document.createElement('fake-shadow-root');

    const mockAdapter = new MockAdapter(axios);

    return new Promise(resolve => {

        const firstStylesheet = '* { border: 1px solid green }';
        const secondStylesheet = '* { border: 1px solid orange }';
        const thirdStylesheet = `* { background-image: url('../images/example.png') }`;

        mockAdapter.onGet('/first.css').reply(200, firstStylesheet);
        mockAdapter.onGet('/second.css').reply(200, secondStylesheet);
        mockAdapter.onGet('/components/css/third.css').reply(200, thirdStylesheet);
        mockAdapter.onGet('/fourth.css').reply(404);

        const files = ['/first.css', '/second.css', '/components/css/third.css', '/fourth.css'];
        const props = include(...files)({ node });

        t.deepEqual(props, { node, files });
        t.true(node.classList.contains('resolving'));

        setTimeout(() => {

            // Should be updating the path to make the CSS paths relative to the CSS document.
            const thirdStylesheet = `* { background-image: url('/components/css/../images/example.png') }`;

            t.deepEqual(props, { node, files });
            t.true(node.classList.contains('resolved'));
            t.is(node.shadowRoot.querySelector('style').innerHTML, `${firstStylesheet} ${secondStylesheet} ${thirdStylesheet}`);

            resolve();

        });

    });

});
