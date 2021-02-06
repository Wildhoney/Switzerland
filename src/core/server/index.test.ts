import { create } from '.';

describe('create', () => {
    it('should be able to render to string', async () => {
        const imogen = create('x-imogen');
        const node = await imogen.render();
        expect(node.outerHTML).toEqual('<x-imogen data-swiss=""></x-imogen>');
    });

    it('should be able to render to string with extension', async () => {
        const imogen = create('x-imogen', 'button');
        const node = await imogen.render();
        expect(node.outerHTML).toEqual('<x-imogen data-swiss="" is="button"></x-imogen>');
    });

    it('should be able to render to string with attributes', async () => {
        const imogen = create('x-imogen');
        const node = await imogen.render({ language: 'en' });
        expect(node.outerHTML).toEqual('<x-imogen data-swiss="" language="en"></x-imogen>');
    });
});
