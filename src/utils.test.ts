import {
    dispatchEvent,
    fromCamelcase,
    getAttributes,
    hasApplicableMutations,
    stripTrailingSlashes,
    toCamelcase,
} from './utils';

describe('stripTrailingSlashes()', () => {
    it.each`
        input                                 | output
        ${'https://www.imogen.com'}           | ${`https://www.imogen.com`}
        ${'https://www.imogen.com/'}          | ${`https://www.imogen.com`}
        ${'https://www.imogen.com/////'}      | ${`https://www.imogen.com`}
        ${'https://www.imogen.com:3000/////'} | ${`https://www.imogen.com:3000`}
    `('should be able to strip trailing slashes and transform "$input" → "$output"', ({ input, output }) => {
        expect(stripTrailingSlashes(input)).toEqual(output);
    });
});

describe('toCamelcase()', () => {
    describe('fromKebab()', () => {
        it.each`
            input                  | output
            ${'imogen'}            | ${`imogen`}
            ${'my_name_is_imogen'} | ${`my_name_is_imogen`}
            ${'my-name-is-imogen'} | ${`myNameIsImogen`}
        `('should be able convert camelcase to kebabcase and transform "$input" → "$output"', ({ input, output }) => {
            expect(toCamelcase(input).fromKebab()).toEqual(output);
        });
    });

    describe('fromSnake()', () => {
        it.each`
            input                  | output
            ${'imogen'}            | ${`imogen`}
            ${'my-name-is-imogen'} | ${`my-name-is-imogen`}
            ${'my_name_is_imogen'} | ${`myNameIsImogen`}
        `('should be able convert camelcase to snakecase and transform "$input" → "$output"', ({ input, output }) => {
            expect(toCamelcase(input).fromSnake()).toEqual(output);
        });
    });
});

describe('fromCamelcase()', () => {
    describe('toKebab()', () => {
        it.each`
            input                  | output
            ${'imogen'}            | ${`imogen`}
            ${'my_name_is_imogen'} | ${`my_name_is_imogen`}
            ${'myNameIsImogen'}    | ${`my-name-is-imogen`}
        `('should be able convert camelcase from kebabcase and transform "$input" → "$output"', ({ input, output }) => {
            expect(fromCamelcase(input).toKebab()).toEqual(output);
        });
    });

    describe('toSnake()', () => {
        it.each`
            input                  | output
            ${'imogen'}            | ${`imogen`}
            ${'my-name-is-imogen'} | ${`my-name-is-imogen`}
            ${'myNameIsImogen'}    | ${`my_name_is_imogen`}
        `('should be able convert camelcase from snakecase and transform "$input" → "$output"', ({ input, output }) => {
            expect(fromCamelcase(input).toSnake()).toEqual(output);
        });
    });
});

describe('dispatchEvent()', () => {
    it('should be able to dispatch events on supplied node', () => {
        const node = document.createElement('div');
        const spy = jest.spyOn(node, 'dispatchEvent');

        const dispatcher = dispatchEvent(node);
        const result = dispatcher('person', { name: 'Imogen' });

        expect(spy).toHaveBeenCalledTimes(1);
        expect(result).toBe(true);
    });
});

describe('hasApplicableMutations()', () => {
    it.each`
        input      | output
        ${'Adam'}  | ${true}
        ${'Maria'} | ${false}
    `('should be able to determine when there is an applicable mutation for "$input"', ({ input, output }) => {
        const node = document.createElement('div');
        node.setAttribute('name', 'Maria');
        const mutations = [{ attributeName: 'name', oldValue: input }];

        expect(hasApplicableMutations(node, mutations as MutationRecord[])).toBe(output);
    });
});

describe('getAttributes()', () => {
    it('should be able to fetch the attributes from the supplied node', () => {
        const node = document.createElement('div');
        node.setAttribute('firstName', 'Adam');
        node.setAttribute('age', '36');
        node.setAttribute('location', 'Horsham, UK');

        expect(getAttributes(node.attributes)).toMatchInlineSnapshot(`
            Object {
              "age": "36",
              "firstname": "Adam",
              "location": "Horsham, UK",
            }
        `);
    });
});
