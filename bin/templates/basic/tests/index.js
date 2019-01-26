import test from '{testRunner}';
import name from '../index.js';

test('It should be able to create the {name} node;', t => {
    t.is(name, '{name}');
});
