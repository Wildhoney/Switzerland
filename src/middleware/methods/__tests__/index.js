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
        const name = 'x-example';
        await utils.waitForUpgrade(name);

        await page.evaluate(name => {
            const node = document.createElement(name);
            document.body.append(node);
            return node.idle();
        }, name);
        t.snapshot(await utils.innerHTML(name));

        await page.evaluate(async name => {
            const node = document.querySelector(name);
            await node.setName('Maria');
        }, name);
        t.snapshot(await utils.innerHTML(name));
    }
);
