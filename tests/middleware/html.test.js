import test from 'ava';
import { spy } from 'sinon';
import html from '../../src/middleware/html';
import { coreKey } from '../../src/helpers/keys';

test('Should be able to wrap yielded HTML;', t => {

    const node = document.createElement('div');
    node.setAttribute('name', 'Switzerland');

    const markup = props => `<h1>${props.attrs.name}</h1>`;
    const attrs = { name: 'Switzerland' };
    const core = { writeVDomState: spy() };

    const props = html(markup)({ node, attrs, [coreKey]: core });

    t.deepEqual(props, { node, attrs, [coreKey]:
        { ...core, root: null, tree: markup({ attrs }) }
    });
    t.is(core.writeVDomState.callCount, 1);

});
