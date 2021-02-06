import { create, render } from '.';
import * as server from './server';

describe('create', () => {
    it('should be able to create component instances', () => {
        expect(create('x-maria')).toBeInstanceOf(server.Swiss);
    });
});

describe('render', () => {
    it('should be able to render component hierarchies', async () => {
        const adam = create('x-adam');
        const html = await render(adam);

        expect(html).toEqual('<x-adam data-swiss=""></x-adam>');
    });
});
