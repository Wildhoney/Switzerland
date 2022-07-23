import { stripTrailingSlashes } from './utils';

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
