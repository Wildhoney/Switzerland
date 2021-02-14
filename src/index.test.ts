import { create, render } from '.';
import * as server from './core/server';

describe.skip('create', () => {
    it('should be able to create server instances', () => {
        expect(create('x-imogen')).toBeInstanceOf(server.Swiss);
    });

    it('should be able to render server instances', async () => {
        const imogen = create('x-imogen', () => 'Hi Imogen!') as server.Swiss;
        expect(await render(imogen)).toMatchSnapshot();
    });
});
