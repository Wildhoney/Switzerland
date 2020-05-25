import test from 'ava';
import { spy } from 'sinon';
import defaultProps from '../../../../tests/helpers/default-props.js';
import { create, render, m } from '../../../index.js';
import once from '../index.js';

test('It should only invoke the function once per node instance;', async (t) => {
    const fn = spy(() => ({ name: 'Adam' }));
    const newProps = await once(fn)(defaultProps);

    t.deepEqual(newProps, { ...defaultProps, name: 'Adam' });
    once(fn)(defaultProps);
    once(fn)(defaultProps);
    t.is(fn.callCount, 1);

    once(fn)({ ...defaultProps, node: document.createElement('div') });
    t.is(fn.callCount, 2);
});

test('It should only invoke the function once per node instance even when the function returns a falsy value;', async (t) => {
    const fn = spy(() => null);
    once(fn)(defaultProps);
    once(fn)(defaultProps);
    once(fn)(defaultProps);
    t.is(fn.callCount, 1);
});

test('It should be able to set a prettier name when passed function name is known;', (t) => {
    const exampleFn = () => {};
    const f1 = once(exampleFn);
    t.is(f1.name, 'once(exampleFn)');
    const f2 = once(() => {});
    t.is(f2.name, 'once');
});

test('It should be able to gracefully handle being rendered to a string;', async (t) => {
    const component = create(
        'x-example',
        once((props) => ({ ...props, message: 'Example' })),
        m.html(({ message, h }) => h('div', {}, message))
    );
    t.is(await render(component), '<x-example class="resolved"><div>Example</div></x-example>');
});
