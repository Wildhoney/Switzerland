import { meta } from '../../core/utils.js';

/**
 * @function createBoundary ∷ ∀ a. ShadowRoot s, HTMLElement e ⇒ e → Object String a → s|e
 * ---
 * Takes the node element and attaches the shadow boundary to it if it doesn't exist
 * already. Returns the node if a shadow boundary cannot be attached to the element.
 */
export const createBoundary = (node, options = {}) => {
    if (node[meta] && node[meta].boundary) {
        return node[meta].boundary;
    }

    const defaultOptions = {
        mode: 'open',
        delegatesFocus: false,
        sheets: null,
    };

    try {
        const boundary = node.attachShadow({
            ...defaultOptions,
            ...options,
        });

        // Attached any adopted stylesheets if any have been passed.
        options.sheets && (boundary.adoptedStyleSheets = [].concat(options.sheets));

        // Memorise the shadow boundary for next time the function is invoked.
        node[meta] && (node[meta].boundary = boundary);

        return boundary;
    } catch {
        return node;
    }
};
