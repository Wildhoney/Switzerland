declare module 'https://cdn.jsdelivr.net/npm/morphdom@2.6.1/dist/morphdom-esm.js' {
    export type Callbacks = { [key: string]: (any) => any };
    const Morph: (HTMLElement, string, Callbacks?) => null;

    export default Morph;
}

declare module 'https://cdn.jsdelivr.net/npm/redux@4.0.1/es/redux.mjs' {
    type Store = any;
    type Middleware = any;
    type Bind = any;

    export const createStore: Store;
    export const applyMiddleware: Middleware;
    export const bindActionCreators: Bind;
}

declare module 'https://cdn.jsdelivr.net/npm/redux-thunk@2.3.0/es/index.js' {
    export default any;
}
