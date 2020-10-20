import test from 'ava';
import { defaultView } from '../index.js';

test('It should be able to initialise the default view;', (t) => {
    const node = document.createElement('x-view');
    const props = defaultView({ node });
    t.snapshot(props);
});
