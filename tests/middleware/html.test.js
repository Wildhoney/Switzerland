import test from 'ava';
import html from '../../src/middleware/html';

test('Should be able to wrap yielded HTML;', t => {

    const node = document.createElement('div');
    node.setAttribute('name', 'Switzerland');

    const markup = props => `<h1>${props.attrs.name}</h1>`;
    const attrs = { name: 'Switzerland' };

    t.deepEqual(html(markup)({ node, attrs }), {
        node, html: markup({ attrs }), attrs
    });

});
