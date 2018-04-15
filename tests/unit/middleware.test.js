import test from 'ava';
import starwars from 'starwars';
import { spy } from 'sinon';
import * as m from '../../src/middleware';

test('It should be able to dispatch a native event;', t => {
    
    const text = starwars();
    const node = document.createElement('div');
    const payload = { node, text };
    node.dispatchEvent = spy();

    m.sendEvent('example', payload);

    t.is(node.dispatchEvent.callCount, 1);
    t.true(node.dispatchEvent.calledWith(new CustomEvent('example', {
        detail: payload,
        bubbles: true,
        composed: true
    })));

});

test('It should be able to resolve a promise after x milliseconds;', async t => {
    const delayed = m.delay(10);
    const props = { text: starwars() };
    const newProps = await delayed(props);
    t.deepEqual(newProps, props);
});
