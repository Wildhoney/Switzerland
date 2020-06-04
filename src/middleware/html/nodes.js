import { fromCamelcase } from '../../core/utils.js';
import { createVNode } from './utils.js';

export function Sheet({ href, media = false}) {
    return createVNode('link', {
        key: href,
        rel: 'stylesheet',
        type: 'text/css',
        href,
        media,
    });
}

export function Variables(props) {
    const vars = Object.entries(props).reduce(
        (accum, [key, value]) => `${accum} --${fromCamelcase(key).toKebab()}: ${value};`,
        ''
    );

    return createVNode('style', { type: 'text/css' }, `:host { ${vars} }`);
}
