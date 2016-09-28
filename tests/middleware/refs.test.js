import test from 'ava';
import { spy } from 'sinon';
import refs, { invokeFor, purgeFor } from '../../src/middleware/refs';

test('Should be able to invoke a function from a ref;', t => {

    const node = document.createElement('div');
    const props = refs({ node });

    const childNode = document.createElement('section');
    const testCallback = spy();
    const ref = props.ref(testCallback);

    ref.hook(childNode);
    invokeFor(node);
    t.is(testCallback.callCount, 1);

    invokeFor(node);
    t.is(testCallback.callCount, 2);

    purgeFor(node);
    invokeFor(node);
    t.is(testCallback.callCount, 2);

});
