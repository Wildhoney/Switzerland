import { spy } from 'sinon';
import { dispatchEvent } from '../../src/core/utils.js';

const node = document.createElement('div');

const props = {
    node,
    render: spy(),
    lifecycle: 'render',
    utils: { dispatch: dispatchEvent(node) }
};

props.props = props;

export default props;
