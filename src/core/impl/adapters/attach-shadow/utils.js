/**
 * @function attachBoundary
 * ---
 * Takes the node element and attaches the shadow boundary to it if it doesn't exist
 * already. Returns the node if a shadow boundary cannot be attached to the element.
 */
export const attachBoundary = (node, options = {}) => {
    if (node.shadowRoot) return node.shadowRoot;

    const defaultOptions = {
        mode: 'open',
        delegatesFocus: false,
        sheets: null,
    };

    try {
        const boundary = node.attachShadow({
            ...defaultOptions,
            ...options,
            mode: defaultOptions.mode,
        });

        // Attached any adopted stylesheets if any have been passed.
        options.sheets && (boundary.adoptedStyleSheets = [].concat(options.sheets));

        return boundary;
    } catch {
        return node;
    }
};
