import test from 'ava';
import { spy, restore } from 'sinon';
import methods from '../../src/middleware/methods';

test.beforeEach(t => spy(window.console.error));
test.afterEach(t => restore(window.console.error));

test('Should be able to apply methods to a component;', t => {

    const node = document.createElement('div');
    const example = spy();

    t.false('example' in node);
    t.deepEqual(methods({ example })({ node }), { node });
    t.true('example' in node);

});
