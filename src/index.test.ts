import { create } from '.';
import * as server from './core/server';

describe('create', () => {
    it('should be able to create server instances', () => {
        expect(create('x-imogen')).toBeInstanceOf(server.Swiss);
    });
});
