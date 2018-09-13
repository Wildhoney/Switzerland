import test from 'ava';
import { spy } from 'sinon';
import methods from '../index.js';
import defaultProps from '../../../../tests/helpers/default-props.js';

test('It should be able to wait for the images to load before continuing;', async t => {
    const add = spy();
    const remove = spy();
    const node = defaultProps.node.cloneNode(true);
    const m = methods({ add, remove });
    const newProps = m({ node });
    node.add();
    node.remove();
    t.is(add.callCount, 1);
    t.is(remove.callCount, 1);
    t.deepEqual(newProps, { node });
});
