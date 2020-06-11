import sinon from 'sinon';
import { getInitialProps } from '../../src/core/impl/utils.js';

const node = window.document.createElement('div');
node.render = sinon.spy();

const props = {
    ...getInitialProps(node, { server: false }),
    node,
    window,
    render: sinon.spy(),
    lifecycle: 'render',
};

props.props = props;

export default props;
