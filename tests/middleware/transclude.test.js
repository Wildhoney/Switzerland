import test from 'ava';
import { VNode } from 'virtual-dom';
import transclude from '../../src/middleware/transclude';
import { statusKey, statuses } from '../../src/helpers/status';

test('Should be able to transclude HTML elements', t => {

    const node = document.createElement('div');
    node.innerHTML = '<h1 id="title">Switzerland</h1>';
    const props = transclude({ node, [statusKey]: statuses.ok });

    t.true(props.children instanceof VNode);
    t.is(props.children.tagName, 'h1');
    t.is(props.children.key, 'title');
    t.is(props.children.children[0].text, 'Switzerland');

});
