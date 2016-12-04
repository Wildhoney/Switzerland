import test from 'ava';
import error, { htmlErrorFor } from '../../src/middleware/error';

test('Should be able to memorise error handlers;', t => {

    const node = document.createElement('div');
    const handler = () => {};

    t.deepEqual(error(handler)({ node }), { node });
    t.is(htmlErrorFor(node), handler);

});
