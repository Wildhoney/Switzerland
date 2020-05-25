import test from 'ava';
import withComponent from 'ava-webcomponents';
import sinon from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
import { create, render, m } from '../../../index.js';
import * as type from '../../../types/index.js';
import attrs, { nodes } from '../index.js';

test.beforeEach((t) => {
    const observe = (t.context.observer = sinon.spy());
    window.MutationObserver = class {
        observe() {
            return observe();
        }
    };

    t.context.mockObserver = (mutations) => {
        const observeSpy = sinon.spy();
        window.MutationObserver = function (f) {
            f(mutations);
        };
        window.MutationObserver.prototype.observe = observeSpy;
        return { observeSpy };
    };
});

test.afterEach(() => {
    window.MutationObserver = undefined;
});

test.serial('It should be able to setup the MutationObserver only once;', (t) => {
    const m = attrs();
    [1, 2, 3].map(() => m(defaultProps));
    t.is(t.context.observer.callCount, 1);
});

test('It should be able to parse the attrs with custom types;', (t) => {
    const node = defaultProps.node.cloneNode(true);
    node.setAttribute('name', 'Adam');
    node.setAttribute('age', '32');
    node.setAttribute('is-developer', 'true');

    const m = attrs({
        name: type.String,
        age: type.Int,
        isDeveloper: type.Bool,
    });
    const newProps = m({ node });
    t.deepEqual(newProps, {
        node,
        attrs: {
            name: 'Adam',
            age: 32,
            isDeveloper: true,
        },
    });
});

test('It should be able to define defaults using a tuple;', (t) => {
    const node = defaultProps.node.cloneNode(true);
    node.setAttribute('name', 'Adam');

    const m = attrs({
        name: type.String,
        age: [type.Int, 32],
        isDeveloper: [type.Bool, true],
    });
    const newProps = m({ node });
    t.deepEqual(newProps, {
        node,
        attrs: {
            name: 'Adam',
            age: 32,
            isDeveloper: true,
        },
    });
});

test('It should be able to remove the node from the map when unmounting;', (t) => {
    const m = attrs();
    m(defaultProps);
    t.true(nodes.has(defaultProps.node));
    m({ ...defaultProps, lifecycle: 'unmount' });
    t.false(nodes.has(defaultProps.node));
});

test('It should invoke the `render` function if the mutations are considered applicable;', (t) => {
    const node = defaultProps.node.cloneNode(true);
    const renderSpy = sinon.spy();
    node.setAttribute('name', 'Adam');
    node.setAttribute('age', '33');

    {
        t.context.mockObserver([{ attributeName: 'age', oldValue: '33' }]);
        const m = attrs({ name: type.String });
        m({ ...defaultProps, node: node.cloneNode(true), render: renderSpy });
        t.is(renderSpy.callCount, 0);
    }

    {
        t.context.mockObserver([{ attributeName: 'name', oldValue: 'Adam' }]);
        const m = attrs({ name: type.String });
        m({ ...defaultProps, node: node.cloneNode(true), render: renderSpy });
        t.is(renderSpy.callCount, 0);
    }

    {
        t.context.mockObserver([{ attributeName: 'name', oldValue: 'Maria' }]);
        const m = attrs({ name: type.String });
        m({ ...defaultProps, node: node.cloneNode(true), render: renderSpy });
        t.is(renderSpy.callCount, 1);
    }

    {
        t.context.mockObserver([{ attributeName: 'age', oldValue: '34' }]);
        const m = attrs({ name: type.String });
        m({ ...defaultProps, node: node.cloneNode(true), render: renderSpy });
        t.is(renderSpy.callCount, 2);
    }
});

test('It should be able to skip the instantiation of a new observer if node seen before;', (t) => {
    const node = defaultProps.node.cloneNode(true);
    const { observeSpy } = t.context.mockObserver([]);
    attrs({ name: type.String });
    nodes.add(node);
    t.is(observeSpy.callCount, 0);
});

test('It should be able to skip mutations if the attribute is in excluded list;', (t) => {
    const node = defaultProps.node.cloneNode(true);
    const renderSpy = sinon.spy();
    node.setAttribute('name', 'Adam');
    node.setAttribute('age', '33');
    node.classList.add('something');

    t.context.mockObserver([{ attributeName: 'class', oldValue: 'nothing' }]);
    const m = attrs({ name: type.String, age: type.Int }, ['class']);
    m({ node: node.cloneNode(true), render: renderSpy });
    t.is(renderSpy.callCount, 0);
});

test('It should be able to gracefully handle being rendered to a string;', async (t) => {
    const component = create(
        'x-example',
        attrs({ message: type.String }),
        m.html(({ attrs, h }) => h('div', {}, attrs.message))
    );
    t.is(
        await render(component, { message: 'Example' }),
        '<x-example message="Example" class="resolved"><div>Example</div></x-example>'
    );
});

test(
    'It should be able to attach methods to the element and then invoke them;',
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

        await page.evaluate(async (name) => {
            const node = document.querySelector(name);
            node.setAttribute('name', 'Maria');
            node.setAttribute('age', 28);
        }, name);
        t.snapshot(await utils.innerHTML(name));

        await page.evaluate(async (name) => {
            const node = document.querySelector(name);
            node.removeAttribute('name');
        }, name);
        t.snapshot(await utils.innerHTML(name));
    }
);
