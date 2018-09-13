import test from 'ava';
import loader from '../index.js';
import defaultProps from '../../../../tests/helpers/default-props.js';

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
