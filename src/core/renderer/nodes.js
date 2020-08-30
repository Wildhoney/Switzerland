import { fromCamelcase } from '../../core/utils.js';
import { createVNode } from './utils.js';

export function Sheet({ href, media = false }) {
    return createVNode('link', {
        key: href,
        rel: 'stylesheet',
        type: 'text/css',
        href,
        media,
    });
}

function createVariables(props, selector = ':host') {
    const vars = Object.entries(props).reduce(
        (accum, [key, value]) => `${accum} --${fromCamelcase(key).toKebab()}: ${value};`,
        ''
    );

    return createVNode('style', { type: 'text/css' }, `${selector} { ${vars} }`);
}

export function Variables(props) {
    return createVariables(props);
}

Variables.for = (selector) => {
    return (props) => createVariables(props, selector);
};

export function Fragment(props) {
    return props.children ?? Object.values(props);
}
