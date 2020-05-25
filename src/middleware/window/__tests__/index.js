import test from 'ava';
import withComponent from 'ava-webcomponents';
import defaultProps from '../../../../tests/helpers/default-props.js';
import window from '../index.js';

test('It should be able to supply the JSDOM instance of window;', async (t) => {
    const m = window('https://www.example.org/');
    const newProps = await m(defaultProps);
    t.is(newProps.window.location.host, 'www.example.org');
});

test(
    'It should be able to provide the global window if non-Node environment;',
    withComponent(`${__dirname}/helpers/mock.js`),
    async (t, { page, utils }) => {
        const name = 'x-example';
        await utils.waitForUpgrade(name);

        await page.evaluate((name) => {
            const node = document.createElement(name);
            document.body.append(node);
            return node.idle();
        }, name);

        t.snapshot(await utils.innerHTML(name));
    }
);
