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

// Extend the `h` object with useful functions.
const extendedH = h;
extendedH.variables = variables;
extendedH.stylesheet = stylesheet;

/**
 * @function vdom ∷ View v, Props p ⇒ (p → v) → (p → p)
 * ---
 * Takes a virtual DOM representation that will render to the node's shadow boundary. For size reasons, Switzerland
 * uses Picodom over VirtualDOM, and as such you can use the Picodom documentation for reference.
 */
export default function vdom(getView, options = {}) {
    return async props => {
        const boundary = createShadowRoot(props.node, options);

        if (props.node.isConnected) {
            // Attach `h` to the current set of props, and all of its infinitely nested `props` where
            // the `props` haven't been shallowly copied.
            props.props.h = extendedH;

            const view = await getView({ ...props, h: extendedH });

            if (view) {
                const tree = patch(u.takeTree(props.node), view, boundary);
                u.putTree(props.node, tree);
            }
        }

        return { ...props, boundary };
    };
}

export { extendedH as h };
