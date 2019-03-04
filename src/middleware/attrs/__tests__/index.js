import test from 'ava';
import { spy } from 'sinon';
import * as R from 'ramda';
import defaultProps from '../../../../tests/helpers/default-props.js';
import * as type from '../../../types/index.js';
import attrs from '../index.js';

test.beforeEach(t => {
    const observe = (t.context.observer = spy());
    window.MutationObserver = class {
        observe() {
            return observe();
        }
    };

    t.context.mockObserver = mutations => {
        window.MutationObserver = function(f) {
            f(mutations);
        };
        window.MutationObserver.prototype.observe = R.identity;
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

test.only('It should invoke the `render` function if the mutations are considered applicable;', t => {
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
});
