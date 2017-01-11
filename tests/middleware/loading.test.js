import test from 'ava';
import { spy, match } from 'sinon';
import loading, { vDomPropsKey } from '../../src/middleware/loading';

test('Should be able to render an intermediary state using the previous props;', t => {

    const node = document.createElement('div');
    node.setAttribute('name', 'Switzerland');

    const markup = spy();
    const attrs = { name: 'Switzerland' };
    const prevProps = { attrs };
    const props = loading(markup)({ node, attrs, prevProps, [vDomPropsKey]: { tree: {}, root: {} } });

    t.deepEqual(props, { node, attrs, prevProps, [vDomPropsKey]: { ...props[vDomPropsKey] } });
    t.true(markup.calledWith({ ...prevProps, loading: true }));

});
