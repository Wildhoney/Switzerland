import test from 'ava';
import { h } from 'virtual-dom';
import { create } from '../src/switzerland';
import { define } from './helpers/setup-browser-env';

test('Should be create a custom <x-tag /> node;', t => {

    create('x-tag', () => h('h1', {}, ['XTag']));

    t.is(define.callCount, 1);

});
