import test from 'ava';
import defaultProps from '../../../../tests/helpers/default-props.js';
import { create, render, m } from '../../../index.js';
import loader from '../index.js';

test.beforeEach(() => {
    window.Image = class {
        constructor() {
            this.resolver = null;
        }
        addEventListener(type, resolve) {
            if (type === 'load') this.resolver = resolve;
        }
        setAttribute() {
            this.resolver();
        }
    };
});

test('It should be able to wait for the images to load before continuing;', async t => {
    const m = loader({ example: 'example.png' });
    const newProps = await m(defaultProps);
    t.deepEqual(newProps, {
        ...defaultProps,
        loader: { example: 'example.png' }
    });
});

test('It should be able to gracefully handle being rendered to a string;', async t => {
    const component = create(
        'x-example',
        loader({ example: 'Example.png' }),
        m.html(({ loader, h }) => h('div', {}, loader.example))
    );
    t.is(await render(component), '<x-example class="resolved"><div>Example.png</div></x-example>');
});
