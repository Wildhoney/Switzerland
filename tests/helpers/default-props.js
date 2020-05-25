import { spy } from 'sinon';
import { initialProps } from '../../src/core/utils.js';

const node = document.createElement('div');
node.render = spy();

const props = {
    ...initialProps(node, [], {}, Promise.resolve()),
    node,
    render: spy(),
    lifecycle: 'render',
};

props.props = props;

export default props;
