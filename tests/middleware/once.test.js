import test from 'ava';
import { spy } from 'sinon';
import once from '../../src/middleware/once';

test('Should be able to invoke function once per node;', t => {

    const firstNode = document.createElement('div');
    const secondNode = document.createElement('div');

    const worker = Symbol('worker');
    const fn = spy(props => Promise.resolve({ worker, ...props }));
    const applyWorker = once(fn);

    return new Promise(resolve => {

        applyWorker({ node: firstNode, name: 'Switzerland' });
        applyWorker({ node: firstNode, name: 'Switzerland' }).then(props => {
            t.deepEqual({ worker, node: firstNode, name: 'Switzerland' }, props);
        });

        applyWorker({ node: secondNode, name: 'Switzerland' });
        applyWorker({ node: secondNode, name: 'Switzerland' }).then(props => {
            t.deepEqual({ worker, node: secondNode, name: 'Switzerland' }, props);
        });

        t.is(fn.callCount, 2);
        resolve();

    });

});

test('Should be able to take the fresh props over the `once` props;', t => {

    const node = document.createElement('div');
    const fn = spy(props => ({ ...props, state: 'stale', name: 'Switzerland' }));
    const applyProps = once(fn);

    t.deepEqual(applyProps({ node, state: 'fresh' }), { node, state: 'fresh', name: 'Switzerland' });

});
