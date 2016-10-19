import test from 'ava';
import { spy } from 'sinon';
import cleanup from '../../src/middleware/cleanup';

test('Should be able to invoke the cleanup function when node has been removed;', t => {

    const create = isConnected => Object.create(document.createElement('div'), { isConnected: { value: isConnected } });
    const fn = spy();

    const connectedNode = create(true);
    const disconnectedNode = create(false);

    cleanup(fn)({ node: connectedNode });
    cleanup(fn)({ node: disconnectedNode });

    t.is(fn.callCount, 1);
    t.true(connectedNode.isConnected);
    t.false(disconnectedNode.isConnected);

});
