import test from 'ava';
import * as utils from '../utils.js';

test('It should be able to determine the size from the container width;', (t) => {
    t.is(utils.getContainerSize(480), 'tiny');
    t.is(utils.getContainerSize(768), 'small');
    t.is(utils.getContainerSize(1024), 'medium');
    t.is(utils.getContainerSize(1200), 'large');
    t.is(utils.getContainerSize(1201), 'enormous');
});
