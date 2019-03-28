import test from 'ava';
import path from 'path';
import delay from 'delay';
import { spy } from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
import withPage from '../../../../tests/helpers/puppeteer.js';
import intersect, { nodes } from '../index.js';

test.beforeEach(t => {
    nodes.delete(defaultProps.node);

    const observeSpy = spy();
    const unobserveSpy = spy();

    t.context.mockObserver = entries => {
        window.IntersectionObserver = function(f) {
            f(entries);
        };
        window.IntersectionObserver.prototype.observe = observeSpy;
        window.IntersectionObserver.prototype.unobserve = unobserveSpy;
        t.context.spies = { observeSpy, unobserveSpy };
    };
});

test.afterEach(() => {
    window.IntersectionObserver = undefined;
});

test.serial('It should add them to add the node to the set;', t => {
    t.context.mockObserver([]);
    const m = intersect();
    t.false(nodes.has(defaultProps.node));
    const newProps = m({ ...defaultProps, lifecycle: 'mount' });
    t.true(nodes.has(defaultProps.node));
    t.deepEqual(newProps, { ...defaultProps, lifecycle: 'mount' });
});

test.serial('It should observe only once per instance of node;', t => {
    t.context.mockObserver([]);
    const { observeSpy } = t.context.spies;
    const m = intersect();
    m({ ...defaultProps, lifecycle: 'mount' });
    [1, 2, 3].map(() => m(defaultProps));
    t.is(observeSpy.callCount, 1);
});

test.serial(
    'It should be able to toggle the observerable depending on the lifecycle;',
    t => {
        t.context.mockObserver([]);
        const { observeSpy, unobserveSpy } = t.context.spies;
        const m = intersect();
        m({ ...defaultProps, lifecycle: 'mount' });
        t.is(observeSpy.callCount, 1);
        m({ ...defaultProps, lifecycle: 'unmount' });
        t.is(unobserveSpy.callCount, 1);
    }
);

test.serial(
    'It should be able to invoke `render` for each observed component;',
    t => {
        const firstMock = document.createElement('div');
        const secondMock = document.createElement('div');
        const thirdMock = document.createElement('div');

        t.context.mockObserver([
            { target: firstMock, contentRect: {} },
            { target: thirdMock, contentRect: {} }
        ]);

        firstMock.render = spy();
        secondMock.render = spy();
        thirdMock.render = spy();

        const m = intersect();
        m({ ...defaultProps, lifecycle: 'mount' });
        t.is(firstMock.render.callCount, 1);
        t.is(secondMock.render.callCount, 0);
        t.is(thirdMock.render.callCount, 1);
    }
);

test(
    'It should be able to fire the `render` function each time the intersections change;',
    withPage,
    async (t, puppeteer) => {
        const getMarkup = () =>
            puppeteer.page.evaluate(async () => {
                const node = document.querySelector('x-example');
                return node.innerHTML;
            });

        await puppeteer.read(path.resolve(__dirname, 'mock.md'));
        await puppeteer.load('x-example');

        await puppeteer.page.evaluate(() => {
            const node = document.querySelector('x-example');
            node.style.display = 'block';
            node.style.width = '200px';
            node.style.height = '300px';
            node.style.transform = 'translate(0, -250px)';
            return node.render();
        });
        await delay(100);
        t.is(await getMarkup(), '<main>0.30</main>');

        await puppeteer.page.evaluate(() => {
            const node = document.querySelector('x-example');
            node.style.transform = 'translate(0, -100px)';
        });
        await delay(100);
        t.is(await getMarkup(), '<main>0.80</main>');

        await puppeteer.page.evaluate(() => {
            const node = document.querySelector('x-example');
            node.style.transform = 'translate(0, 0)';
        });
        await delay(100);
        t.is(await getMarkup(), '<main>1.00</main>');
    }
);
