import * as u from '../core/utils.js';

/**
 * @function initialProps ∷ HTMLElement e, Props p ⇒ e → [(p → p)] → p
 */
export const initialProps = (node, middleware) => {
    const utils = {
        dispatch: () => {},
        abort: () => {},
        getMiddleware: () => Promise.all(middleware),
        getLatestProps: () => undefined,
        isHeadless: true,
        isIdle: () => false,
        isResolved: () => true
    };

    return {
        signal: {},
        node,
        utils,
        render: () => {},
        prevProps: undefined,
        lifecycle: 'mount'
    };
};

/**
 * @function parseHtml ∷ String → String
 */
export const parseHtml = html => {
    const host = global.document.createElement('div');
    host.innerHTML = html;
    return host;
};

/**
 * @function parseComponent ∷ [String, [(p → p)]] → Object String a → HTMLElement → String
 */
export const parseComponent = async ([name, middleware], node, attrs) => {
    const host = node || global.document.createElement(name);
    // Attach any custom attributes to the host element.
    Object.entries(attrs).forEach(([name, value]) => host.setAttribute(name, value));
    // Cycle through the middleware and append the "resolved" class name.
    const props = initialProps(host, middleware);
    await u.cycleMiddleware(host, props, middleware);
    host.classList.add('resolved');
    return host;
};
