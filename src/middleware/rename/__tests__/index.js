import test from 'ava';
import starwars from 'starwars';
import defaultProps from '../../../../tests/helpers/default-props.js';
import { create, render, m, h } from '../../../index.js';
import rename from '../index.js';

test('It should be able to simply yield the props if no new props;', async (t) => {
    const m = rename('none', (props) => props);
    const newProps = await m(defaultProps);
    t.deepEqual(newProps, defaultProps);
});

test('It should be able to rename the props when only one item is added;', async (t) => {
    const m = rename('single', (props) => ({ ...props, one: true }));
    const newProps = await m(defaultProps);
    t.deepEqual(newProps, { ...defaultProps, single: true });
});

test('It should be able to rename the props when only multiple items are added;', async (t) => {
    const m = rename('multiple', (props) => ({
        ...props,
        one: true,
        two: true,
        three: true,
    }));

    const newProps = await m(defaultProps);

    t.deepEqual(newProps, {
        ...defaultProps,
        multiple: { one: true, two: true, three: true },
    });
});

test('It should be able to gracefully handle being rendered to a string;', async (t) => {
    const component = create(
        'x-example',
        rename('message', (props) => ({ ...props, [starwars()]: 'Example' })),
        m.html(({ message }) => h('div', {}, message))
    );

    t.is(await render(component), '<x-example data-swiss><div>Example</div></x-example>');
});
