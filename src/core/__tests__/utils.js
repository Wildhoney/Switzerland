import test from 'ava';
import { getDefaultView } from '../utils.js';

test('It should be able to initialise the default view;', (t) => {
    const node = document.createElement('x-view');
    const props = getDefaultView({ node });
    t.snapshot(props);
});
