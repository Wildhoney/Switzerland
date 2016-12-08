import test from 'ava';
import { spy } from 'sinon';
import cleanup from '../../src/middleware/cleanup';
import { statusKey, statuses } from '../../src/helpers/status';

test('Should be able to invoke the cleanup function when node has been removed;', t => {

    const fn = spy();

    const connectedNode = document.createElement('div');
    const disconnectedNode = document.createElement('div');

    cleanup(fn)({ node: disconnectedNode, attached: false, [statusKey]: statuses.ok });
    cleanup(fn)({ node: disconnectedNode, attached: false, [statusKey]: statuses.error });

    cleanup(fn)({ node: connectedNode, attached: true, [statusKey]: statuses.ok });
    cleanup(fn)({ node: disconnectedNode, attached: true, [statusKey]: statuses.error });

    t.is(fn.callCount, 2);

});

test('Should be able to ignore the cleanup when the key has been set;', t => {

    const fn = spy();

    const connectedNode = document.createElement('div');
    const disconnectedNode = document.createElement('div');

    cleanup(fn)({ node: connectedNode, attached: true, [statusKey]: statuses.ok });
    cleanup(fn)({ node: disconnectedNode, attached: false, [statusKey]: statuses.ok });
    cleanup(fn)({ node: connectedNode, attached: true, [statusKey]: statuses.ok });
    cleanup(fn)({ node: disconnectedNode, attached: false, [statusKey]: statuses.ok });

    t.is(fn.callCount, 2);

});
