import { create } from '.';
import { SwissServer } from './core/server';

describe('create', () => {
    it('should be able to create server instances', () => {
        expect(create('x-imogen')).toBeInstanceOf(SwissServer);
    });
});
