import test from 'ava';
import mockAdapter from 'fetch-mock';
import { options } from '../../src/switzerland';
import include from '../../src/middleware/include';

test.beforeEach(t => {

    const node = document.createElement('div');
    node.isConnected = true;
    node.shadowRoot = document.createElement('fake-shadow-root');

    t.context.node = node;

});

test('Should be able to yield a promise by default;', t => {

    const { node } = t.context;

    const stylesheet = '* { border: 1px solid green; }';
    mockAdapter.get('/first.css', { status: 200, body: stylesheet });

    t.falsy(include(['/first.css'], options.ASYNC)({ node }) instanceof Promise);
    t.true(include(['/first.css'])({ node }) instanceof Promise);

});

test('Should be able to include external documents', t => {

    const { node } = t.context;

    return new Promise(resolve => {

        const firstStylesheet = '* { border: 1px solid green; }';
        const secondStylesheet = '* { border: 1px solid orange; }';
        const thirdStylesheet = `* { background-image: url('../images/example.png'), content: url('../images/example.png') }`;

        mockAdapter.get('/first.css', { status: 200, body: firstStylesheet });
        mockAdapter.get('/second.css', { status: 200, body: secondStylesheet });
        mockAdapter.get('/components/css/third.css', { status: 200, body: thirdStylesheet });
        mockAdapter.get('/fourth.css', { status: 404 });

        const files = ['/first.css', '/second.css', '/components/css/third.css', '/fourth.css'];
        const props = include([...files], options.ASYNC)({ node });

        t.deepEqual(props, { node });
        t.true(node.classList.contains('styling'));

        setTimeout(() => {

            // Should be updating the path to make the CSS paths relative to the CSS document.
            const thirdStylesheet = `* { background-image: url('/components/css/../images/example.png'), content: url('/components/css/../images/example.png') }`;

            t.deepEqual(props, { node });
            t.true(node.classList.contains('styled'));
            t.is(node.shadowRoot.querySelector('style').innerHTML, `${firstStylesheet} ${secondStylesheet} ${thirdStylesheet}`);
            resolve();

        });

    });

});
