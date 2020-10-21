import { fromCamelcase } from '../../core/utils.js';
import { createVNode } from './utils.js';

/**
 * @function Sheet
 * ---
 * Utility VDOM node for linking to a stylesheet.
 */
export function Sheet({ href, media = false }) {
    return createVNode('link', {
        key: href,
        rel: 'stylesheet',
        type: 'text/css',
        href,
        media,
    });
}

/**
 * @function createVariables
 * ---
 *  Takes the props and transform them into valid CSS variables.
 */
function createVariables(props, selector = ':host') {
    const vars = Object.entries(props).reduce(
        (accum, [key, value]) => `${accum} --${fromCamelcase(key).toKebab()}: ${value};`,
        ''
    );

    return createVNode('style', { type: 'text/css' }, `${selector} { ${vars} }`);
}

/**
 * @function Variables
 * ---
 * Utility VDOM node for creating CSS variables from a simple object.
 */
export function Variables(props) {
    return createVariables(props);
}

/**
 * @function Variables.for
 * ---
 * Allows the customisation of the selector when composing the CSS variables.
 */
Variables.for = (selector) => {
    return (props) => createVariables(props, selector);
};

/**
 * @function Fragment
 * ---
 * Utility VDOM node for creating a fragment.
 */
export function Fragment(props) {
    return props.children ?? Object.values(props);
}
