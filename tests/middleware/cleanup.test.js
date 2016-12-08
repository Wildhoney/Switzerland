import test from 'ava';
import { spy } from 'sinon';
import cleanup from '../../src/middleware/cleanup';

test('Should be able to invoke the cleanup function when node has been removed;', t => {

    const fn = spy();

    const connectedNode = document.createElement('div');
    const disconnectedNode = document.createElement('div');

    cleanup(fn)({ node: disconnectedNode, attached: false });
    cleanup(fn)({ node: connectedNode, attached: true });

    t.is(fn.callCount, 1);

});
