import { spy } from 'sinon';
import { dispatchEvent } from '../../src/core/utils.js';

const node = document.createElement('div');

export default {
    node,
    render: spy(),
    dispatch: dispatchEvent(node)
};
