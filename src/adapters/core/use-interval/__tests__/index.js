import test from 'ava';
import sinon from 'sinon';
import delay from 'delay';
import useInterval from '../index.js';

test('It should be able to re-render the component every few milliseconds;', async (t) => {
    const spies = { render: sinon.spy() };
    const node = document.createElement('x-imogen');
    const run = useInterval({ node, lifecycle: 'mount', render: spies.render });

    run(10);
    await delay(15);
    t.is(spies.render.callCount, 1);

    await delay(35);
    t.is(spies.render.callCount, 4);

    {
        const run = useInterval({ node, lifecycle: 'unmount', render: spies.render });
        run(10);
        await delay(100);
        t.is(spies.render.callCount, 4);
    }
});
