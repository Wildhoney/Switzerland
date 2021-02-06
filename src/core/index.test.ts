import { create, h, render } from '.';
import * as server from './server';

describe('create', () => {
    it('should be able to create component instances', () => {
        expect(create('x-maria')).toBeInstanceOf(server.Swiss);
    });
});

describe('render', () => {
    it('should be able to render component hierarchies', async () => {
        const adam = create('x-adam', () => 'Adam');
        const maria = create('x-maria', () => 'Maria');
        const imogen = create('x-imogen', () => 'Imogen');

        const people = create('x-people', () => {
            return h('section', {}, [
                h(adam, { nationality: 'British' }),
                h(maria, { nationality: 'Russian/British' }),
                h(imogen, { nationality: 'British' }),
            ]);
        });

        const html = await render(people);
        expect(html).toMatchSnapshot();
    });
});
