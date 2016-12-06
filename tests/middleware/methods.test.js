import test from 'ava';
import { spy } from 'sinon';
import methods from '../../src/middleware/methods';

test('Should be able to apply methods to a component;', t => {

    const node = document.createElement('div');
    const example = spy();

    t.false('example' in node);
    t.deepEqual(methods({ example })({ node }), { node });
    t.true('example' in node);

});
