import test from 'ava';
import withComponent from 'ava-webcomponents';
import { spy } from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
import methods from '../index.js';

test('It should be able to attach methods to the node;', t => {
    const add = spy();
    const remove = spy();
    const node = defaultProps.node.cloneNode(true);
    const m = methods({ add, remove });
    const newProps = m({ node });
    node.add();
    node.remove();
    t.is(add.callCount, 1);
    t.is(remove.callCount, 1);
    t.deepEqual(newProps, { node });
});

test(
    'It should be able to attach methods to the element and then invoke them;',
    withComponent(`${__dirname}/helpers/mock.js`),
    async (t, { page, utils }) => {
        const getHTML = () =>
            page.evaluate(() => document.querySelector('x-example').innerHTML);

        await utils.waitForUpgrade('x-example');
        await page.evaluate(() => {
            const node = document.createElement('x-example');
            document.body.append(node);
            return node.idle();
        });
        t.is(await getHTML(), '<div class="adam">Hey Adam!</div>');

        await page.evaluate(async () => {
            const node = document.querySelector('x-example');
            await node.setName('Maria');
        });
        t.is(await getHTML(), '<div class="maria">Hey Maria!</div>');
    }
);
