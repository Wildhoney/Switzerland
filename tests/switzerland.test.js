import test from 'ava';
import { h } from 'virtual-dom';
import { create } from '../src/switzerland';
import { define } from './helpers/setup-browser-env';

test('x', t => {

    create('x-tag', () => {
        return h('h1', {}, ['XTag']);
    });

    t.is(define.callCount, 1);

});
