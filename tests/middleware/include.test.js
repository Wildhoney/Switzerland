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

        mockAdapter.onGet('/first.css').reply(200, firstStylesheet);
        mockAdapter.onGet('/second.css').reply(200, secondStylesheet);
        mockAdapter.onGet('/third.css').reply(404);

        const files = ['/first.css', '/second.css', '/third.css'];
        const props = include(...files)({ node });

        t.deepEqual(props, { node, files });
        t.true(node.classList.contains('resolving'));

        setTimeout(() => {

            t.deepEqual(props, { node, files });
            t.true(node.classList.contains('resolved'));
            t.is(node.shadowRoot.querySelector('style').innerHTML, `${firstStylesheet} ${secondStylesheet}`);

            resolve();

        });

    });

});
