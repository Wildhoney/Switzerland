import test from 'ava';
import { spy, match } from 'sinon';
import loading from '../../src/middleware/loading';

test('Should be able to render an intermediary state using the previous props;', t => {

    const node = document.createElement('div');
    node.setAttribute('name', 'Switzerland');

    const markup = spy();
    const attrs = { name: 'Switzerland' };
    const prevProps = { tree: {}, root: {}, props: { attrs } };
    const props = loading(markup)({ node, attrs, prevProps });

    t.deepEqual(props, { node, attrs, prevProps, root: props.root, tree: props.tree });
    t.true(markup.calledWith({ ...prevProps.props, loading: true }));

});
