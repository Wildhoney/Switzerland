import { getInitialProps } from './utils';

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
