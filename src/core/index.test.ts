import { create, h, render } from '.';
import * as server from './server';

describe.skip('create', () => {
    it('should be able to create component instances', () => {
        expect(create('x-maria')).toBeInstanceOf(server.Swiss);
    });
});

describe.skip('render', () => {
    it('should be able to handle parent components yielding null', async () => {
        const people = create('x-people', () => null) as server.Swiss;
        const html = await render(people);
        expect(html).toEqual('<x-people data-swiss=""></x-people>');
    });

    it('should be able to handle child components yielding null', async () => {
        const adam = create('x-adam', () => null) as server.Swiss;
        const people = create('x-people', () => {
            return h('section', {}, [h(adam, { location: 'London, United Kingdom' })]);
        }) as server.Swiss;

        const html = await render(people);
        expect(html).toEqual(
            '<x-people data-swiss=""><section><x-adam data-swiss="" location="London, United Kingdom"></x-adam></section></x-people>'
        );
    });

    it('should be able to render component hierarchies', async () => {
        const adam = create('x-adam', () => 'Adam') as server.Swiss;
        const maria = create('x-maria', () => 'Maria') as server.Swiss;
        const imogen = create('x-imogen', () => 'Imogen') as server.Swiss;

        const people = create('x-people', () => {
            return h('section', {}, [
                h(adam, { nationality: 'British' }),
                h(maria, { nationality: 'Russian/British' }),
                h(imogen, { nationality: 'British' }),
            ]);
        }) as server.Swiss;

        const html = await render(people);
        expect(html).toMatchSnapshot();
    });
});
