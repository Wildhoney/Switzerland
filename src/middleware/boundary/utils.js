/**
 * @constant boundary ∷ Symbol
 */
const boundary = Symbol('boundary');

/**
 * @function createBoundary ∷ ∀ a. ShadowRoot s, HTMLElement e ⇒ e → Object String a → s|e
 * ---
 * Takes the node element and attaches the shadow boundary to it if it doesn't exist
 * already. Returns the node if a shadow boundary cannot be attached to the element.
 */
export const createBoundary = (node, options = {}) => {
    if (node[boundary]) {
        return node[boundary];
    }

    const defaultOptions = {
        mode: 'open',
        delegatesFocus: false,
        sheets: null
    };

    try {
        const root = node.attachShadow({
            ...defaultOptions,
            ...options
        });

        // Attached any adopted stylesheets if any have been passed.
        options.sheets && (root.adoptedStyleSheets = [].concat(options.sheets));

        // Memorise the shadow boundary for next time the function is invoked.
        node[boundary] = root;

        return root;
    } catch (_) {
        return node;
    }
};
