import test from 'ava';
import { spy } from 'sinon';
import once from '../../src/middleware/once';

test('Should be able to invoke function once per node;', t => {

    const firstNode = document.createElement('div');
    const secondNode = document.createElement('div');

    const name = 'Switzerland!';
    const attrs = { location: 'London' };

    const appName = spy(() => {
        return { name };
    });

    t.deepEqual(once(appName)({ node: firstNode }), { node: firstNode, name });
    t.deepEqual(once(appName)({ node: secondNode }), { node: secondNode, name });

    t.deepEqual(once(appName)({ node: firstNode, attrs }), { node: firstNode, name, attrs });
    t.deepEqual(once(appName)({ node: secondNode, attrs }), { node: secondNode, name, attrs });

    t.is(appName.callCount, 2);

});

test('Should be able to the use the `keyFrom` function to determine uniqueness;', t => {

    const node = document.createElement('div');

    const keyFrom = props => ({});
    const initialise = spy();

    t.deepEqual(once(initialise, keyFrom)({ node }), { node });
    t.deepEqual(once(initialise, keyFrom)({ node }), { node });

    t.is(initialise.callCount, 2);


});
