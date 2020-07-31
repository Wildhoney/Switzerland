import test from 'ava';
import view from '../view.js';

test('It should be able to initialise the default view;', (t) => {
    const node = document.createElement('x-view');
    const props = view({ node });
    t.snapshot(props);
});
