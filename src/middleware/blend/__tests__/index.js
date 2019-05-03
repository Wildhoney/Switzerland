import test from 'ava';
import defaultProps from '../../../../tests/helpers/default-props.js';
import { create, render, m } from '../../../index.js';
import blend from '../index.js';

const promise = () =>
    new Promise(resolve => {
        resolve({ name: 'Adam' });
    });

test('It should be able to invoke the `render` function for promises;', async t => {
    const m = blend(promise);
    m({ ...defaultProps, name: 'Maria' });

    t.is(defaultProps.render.callCount, 0);
    await promise;
    t.is(defaultProps.render.callCount, 1);
    t.true(defaultProps.render.calledWith({ name: 'Adam' }));
});

test('It should be able to invoke the `render` function for observables;', async t => {
    const generator = async function*() {
        yield { name: 'Adam' };
    };

    const m = blend(generator);
    const newProps = m({ ...defaultProps, name: 'Maria' });
    t.is(defaultProps.render.callCount, 0);

    await newProps;

    t.is(defaultProps.render.callCount, 1);
    t.true(defaultProps.render.calledWith({ name: 'Adam' }));
});

test('It should be able to gracefully handle being rendered to a string;', async t => {
    const component = create(
        'x-example',
        blend(promise),
        m.html(({ h }) => h('div', {}, 'Example'))
    );
    t.is(await render(component), '<x-example class="resolved"><div>Example</div></x-example>');
});
