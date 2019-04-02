import * as R from 'ramda';
import { create, alias, m } from '../../../../../src/index.js';

const view = ({ h }) => h('div', {}, 'Hello Adam!');

const elementName = create('x-create', m.html(view));

window.renamedElementName = create(elementName, m.html(view));

alias(elementName, 'x-alias');

create('x-native/input', ({ node, props }) => {
    node.addEventListener('input', event => {
        const { value } = event.target;
        event.target.value = R.toUpper(value);
    });
    return props;
});
