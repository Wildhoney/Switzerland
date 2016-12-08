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