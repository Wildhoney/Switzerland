import sinon from 'sinon';
import { initialProps } from '../../src/core/utils.js';

const node = document.createElement('div');
node.render = sinon.spy();

const props = {
    ...initialProps(node, [], {}, Promise.resolve()),
    node,
    render: sinon.spy(),
    lifecycle: 'render',
};

props.props = props;

export default props;
