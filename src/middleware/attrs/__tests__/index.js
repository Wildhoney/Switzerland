import test from 'ava';
import { spy } from 'sinon';
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
});

test.afterEach(() => {
    window.MutationObserver = undefined;
});

test('It should be able to setup the MutationObserver only once;', t => {
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
        name: type.string,
        age: type.int,
        isDeveloper: type.bool
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

test.skip('It should be able to define defaults using a tuple;', t => {
    const node = defaultProps.node.cloneNode(true);
    node.setAttribute('name', 'Adam');

    const m = attrs({
        name: type.string,
        age: [type.int, 32],
        isDeveloper: [type.bool, true]
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
