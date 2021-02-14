import * as server from '.';
import { h } from '..';
import { getInitialProps, transform } from './utils';

describe('getInitialProps()', () => {
    it('should be able to resolve the initial props', async () => {
        const node = document.createElement('x-imogen');
        const initialProps = await getInitialProps({ node, server: true });

        expect(initialProps.node).toEqual(node);
        expect(initialProps.lifecycle).toEqual('mount');
        expect(initialProps.server).toBeTruthy();
        expect(initialProps.render).toEqual(expect.any(Function));
        expect(initialProps.window).toEqual(expect.any(Object));
        expect(initialProps.dispatch).toEqual(expect.any(Function));
    });
});

describe('transform()', () => {
    it('should be able to transform simple node hierarchies', async () => {
        const node = document.createElement('section');
        expect(await transform(node, h('div', {}, ['Hi Imogen']))).toMatchSnapshot();
    });

    it('should be able to transform hierarchies with Swiss components', async () => {
        const node = document.createElement('section');
        expect(
            await transform(node, h('div', {}, [h(new server.Swiss('x-imogen', null, () => 'Hi Imogen'))]))
        ).toMatchSnapshot();
    });
});
