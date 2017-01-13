import test from 'ava';
import vars from '../../src/middleware/vars';

test('Should be able to render CSS variables in style node;', t => {

    const node = document.createElement('div');
    const boundary = node.shadowRoot = document.createElement('fake-shadow-root');
    node.appendChild(boundary);

    const fontSize = 15;
    const themeColour = 'green';

    const handleVars = props => {

        return {
            fontSize: `${props.fontSize}rem`,
            themeColour: props.themeColour
        };

    };

    vars(handleVars)({ node, fontSize, themeColour });
    const html = `<style type="text/css">:host { --font-size: ${fontSize}rem; --theme-colour: ${themeColour}; }</style>`;
    t.is(boundary.innerHTML, html);

});
