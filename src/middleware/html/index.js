import {
    patch,
    h
} from 'https://cdn.jsdelivr.net/npm/superfine@6.0.1/src/index.js';
import { createShadowRoot } from '../../core/utils.js';
import * as u from './utils.js';

/**
 * @function stylesheet ∷ View v ⇒ String → String → String → v
 */
const stylesheet = (path, mediaQuery = '') =>
    h(
        'style',
        { key: path, type: 'text/css' },
        `@import "${path}" ${mediaQuery}`.trim() + ';'
    );

/**
 * @function variables ∷ ∀ a. Object a String → String
 */
const variables = model => {
    const vars = Object.entries(model).reduce(
        (accum, [key, value]) => `${accum} --${u.camelToKebab(key)}: ${value};`,
        ''
    );
    return h('style', { type: 'text/css' }, `:host { ${vars} }`);
};

/**
 * @function html ∷ View v, Props p ⇒ (void → v) → (p → p)
 * ---
 * Takes a virtual DOM representation that will render to the node's shadow boundary. For size reasons, Switzerland
 * uses Picodom over VirtualDOM, and as such you can use the Picodom documentation for reference.
 */
export default function html(getView, options = {}) {
    return async props => {
        const boundary = createShadowRoot(props.node, options);

        if (props.node.isConnected) {
            const view = await getView(props);

            if (view) {
                const tree = patch(u.takeTree(props.node), view, boundary);
                u.putTree(props.node, tree);
            }
        }

        return { ...props, boundary };
    };
}

// Extend the `h` object with useful functions.
const h_ = h;
h_.variables = variables;
h_.stylesheet = stylesheet;

// Convenience appendage for VDOM transpilation so the pragma needs to be only `html.h` without any peculiar
// import of `h` just for the transpilation process.
html.h = h_;

export { h_ as h };
