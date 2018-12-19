import { dispatchEvent } from '../../src/core/utils.js';

const node = document.createElement('div');

export default {
    node,
    dispatch: dispatchEvent(node)
};
