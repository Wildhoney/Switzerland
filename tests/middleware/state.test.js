import test from 'ava';
import { spy } from 'sinon';
import state from '../../src/middleware/state';

test('Should be able to manage state using state/setState;', t => {

    const node = document.createElement('div');
    const render = node.render = spy();
    const props = state({ counter: 0 })({ node });

    t.deepEqual(props, { node, ...props });

    props.setState({ counter: 5 });
    t.is(render.callCount, 1);

});
