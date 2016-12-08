import test from 'ava';
import { spy } from 'sinon';
import waitFor, { awaitKey, awaitEventName, children, resolved } from '../../src/middleware/await';

test('Should be able to augment the props;', t => {

    const node = document.createElement('div');
    const props = waitFor('x-one', 'x-two', 'x-three')({ node });

    t.deepEqual(props, {
        node,
        [awaitKey]: ['x-one', 'x-two', 'x-three']
    });

});

test('Should be able to determine once node has been resolved;', t => {

    const node = document.createElement('div');
    waitFor('x-one', 'x-two', 'x-three')({ node });

    resolved(node);
    node.resolved = { then: spy(Promise.resolve) };
    node.dispatchEvent(new window.CustomEvent(awaitEventName, {
        detail: node
    }));

    t.is(node.resolved.then.callCount, 1);

});

test('Should be able to determine when whole node tree has been resolved;', t => {

    const node = document.createElement('div');
    node.shadowRoot = document.createElement('fake-shadow-root');

    const xOneNode = document.createElement('x-one');
    const xTwoNode = document.createElement('x-two');
    const xThreeNode = document.createElement('x-three');

    node.shadowRoot.appendChild(xOneNode);
    node.shadowRoot.appendChild(xTwoNode);
    node.shadowRoot.appendChild(xThreeNode);

    const props = waitFor('x-one', 'x-two', 'x-three')({ node });

    children(props).then(tree => {

        t.is(tree.size, 3);
        t.true(tree.get(xOneNode));
        t.true(tree.get(xTwoNode));
        t.true(tree.get(xThreeNode));

    });

    // Resolve all of the child nodes.
    node.dispatchEvent(new window.CustomEvent(awaitEventName, { detail: xOneNode }));
    node.dispatchEvent(new window.CustomEvent(awaitEventName, { detail: xTwoNode }));
    node.dispatchEvent(new window.CustomEvent(awaitEventName, { detail: xThreeNode }));

});
