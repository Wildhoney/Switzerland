import test from 'ava';
import withComponent from 'ava-webcomponents';
import { spy } from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
import * as type from '../../../types/index.js';
import attrs, { nodes } from '../index.js';

test.beforeEach(t => {
    const observe = (t.context.observer = spy());
    window.MutationObserver = class {
        observe() {
            return observe();
        }
    };

    t.context.mockObserver = mutations => {
        const observeSpy = spy();
        window.MutationObserver = function(f) {
            f(mutations);
        };
        window.MutationObserver.prototype.observe = observeSpy;
        return { observeSpy };
    };
});

test.afterEach(() => {
    window.MutationObserver = undefined;
});

test.serial('It should be able to setup the MutationObserver only once;', t => {
    const m = attrs();
    [1, 2, 3].map(() => m(defaultProps));
    t.is(t.context.observer.callCount, 1);
});

test('It should be able to parse the attrs with custom types;', t => {
    const node = defaultProps.node.cloneNode(true);
    node.setAttribute('name', 'Adam');
    node.setAttribute('age', '32');
    node.setAttribute('is-developer', 'true');

    const m = attrs({
        name: type.String,
        age: type.Int,
        isDeveloper: type.Bool
    });
    const newProps = m({ node });
    t.deepEqual(newProps, {
        node,
        attrs: {
            name: 'Adam',
            age: 32,
            isDeveloper: true
        }
    });
});

test('It should be able to define defaults using a tuple;', t => {
    const node = defaultProps.node.cloneNode(true);
    node.setAttribute('name', 'Adam');

    const m = attrs({
        name: type.String,
        age: [type.Int, 32],
        isDeveloper: [type.Bool, true]
    });
    const newProps = m({ node });
    t.deepEqual(newProps, {
        node,
        attrs: {
            name: 'Adam',
            age: 32,
            isDeveloper: true
        }
    });
});

test('It should invoke the `render` function if the mutations are considered applicable;', t => {
    const node = defaultProps.node.cloneNode(true);
    const renderSpy = spy();
    node.setAttribute('name', 'Adam');
    node.setAttribute('age', '33');

    {
        t.context.mockObserver([{ attributeName: 'age', oldValue: '33' }]);
        const m = attrs({ name: type.String });
        m({ node: node.cloneNode(true), render: renderSpy });
        t.is(renderSpy.callCount, 0);
    }

    {
        t.context.mockObserver([{ attributeName: 'name', oldValue: 'Adam' }]);
        const m = attrs({ name: type.String });
        m({ node: node.cloneNode(true), render: renderSpy });
        t.is(renderSpy.callCount, 0);
    }

    {
        t.context.mockObserver([{ attributeName: 'name', oldValue: 'Maria' }]);
        const m = attrs({ name: type.String });
        m({ node: node.cloneNode(true), render: renderSpy });
        t.is(renderSpy.callCount, 1);
    }

    {
        t.context.mockObserver([{ attributeName: 'age', oldValue: '34' }]);
        const m = attrs({ name: type.String });
        m({ node: node.cloneNode(true), render: renderSpy });
        t.is(renderSpy.callCount, 2);
    }
});

test('It should be able to skip the instantiation of a new observer if node seen before;', t => {
    const node = defaultProps.node.cloneNode(true);
    const { observeSpy } = t.context.mockObserver([]);
    attrs({ name: type.String });
    nodes.add(node);
    t.is(observeSpy.callCount, 0);
});

test('It should be able to skip mutations if the attribute is in excluded list;', t => {
    const node = defaultProps.node.cloneNode(true);
    const renderSpy = spy();
    node.setAttribute('name', 'Adam');
    node.setAttribute('age', '33');
    node.classList.add('something');

    t.context.mockObserver([{ attributeName: 'class', oldValue: 'nothing' }]);
    const m = attrs({ name: type.String, age: type.Int }, ['class']);
    m({ node: node.cloneNode(true), render: renderSpy });
    t.is(renderSpy.callCount, 0);
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
        });

        t.is(await getHTML(), '<div>Privet Adam! You are old.</div>');

        await page.evaluate(async () => {
            const node = document.querySelector('x-example');
            node.setAttribute('name', 'Maria');
            node.setAttribute('age', 28);
        });
        t.is(await getHTML(), '<div>Privet Maria! You are young.</div>');

        await page.evaluate(async () => {
            const node = document.querySelector('x-example');
            node.removeAttribute('name');
        });
        t.is(await getHTML(), '<div>Privet Adam! You are young.</div>');
    }
);
