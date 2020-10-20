import test from 'ava';
import sinon from 'sinon';
import attachMethods from '../index.js';

test('It should be able to attach methods to the node;', (t) => {
    const spies = { sayHello: sinon.spy() };
    const node = document.createElement('x-imogen');
    const run = attachMethods({ node });

    run({ sayHello: spies.sayHello });
    node.sayHello('Imogen');

    t.is(spies.sayHello.callCount, 1);
    t.true(spies.sayHello.calledWith('Imogen', node));
});
