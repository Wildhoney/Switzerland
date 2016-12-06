import test from 'ava';
import { spy } from 'sinon';
import cleanup from '../../src/middleware/cleanup';
import { ignoreKey } from '../../src/middleware/once';

test('Should be able to invoke the cleanup function when node has been removed;', t => {

    const fn = spy();

    const connectedNode = document.createElement('div');
    const disconnectedNode = document.createElement('div');

    cleanup(fn)({ node: connectedNode, attached: true });
    cleanup(fn)({ node: disconnectedNode, attached: false });

    t.is(fn.callCount, 1);

});

test('Should be able to ignore the cleanup when the key has been set;', t => {

    const fn = spy();

    const connectedNode = document.createElement('div');
    const disconnectedNode = document.createElement('div');

    cleanup(fn)({ node: connectedNode, attached: true, [ignoreKey]: true });
    cleanup(fn)({ node: disconnectedNode, attached: false, [ignoreKey]: true });
    cleanup(fn)({ node: connectedNode, attached: true, [ignoreKey]: true });
    cleanup(fn)({ node: disconnectedNode, attached: false, [ignoreKey]: true });

    t.is(fn.callCount, 2);

});
