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
