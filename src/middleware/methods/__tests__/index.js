import test from 'ava';
import path from 'path';
import { spy } from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
import withPage from '../../../../tests/helpers/puppeteer.js';
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
    withPage,
    async (t, puppeteer) => {
        const getHTML = () =>
            puppeteer.page.evaluate(
                () => document.querySelector('x-example').innerHTML
            );

        await puppeteer.read(path.resolve(__dirname, 'mock.md'));
        await puppeteer.load('x-example');
        t.is(await getHTML(), '<div class="adam">Hey Adam!</div>');

        await puppeteer.page.evaluate(async () => {
            const node = document.querySelector('x-example');
            await node.setName('Maria');
        });
        t.is(await getHTML(), '<div class="maria">Hey Maria!</div>');
    }
);
