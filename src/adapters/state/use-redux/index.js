import * as r from 'redux';
import t from 'redux-thunk';

const redux = {
    createStore: r.default?.createStore ?? r.createStore,
    applyMiddleware: r.default?.applyMiddleware ?? r.applyMiddleware,
    bindActionCreators: r.default?.bindActionCreators ?? r.bindActionCreators,
};

export const nodes = new WeakSet();

/**
 * @function createStore
 * ---
 * Creates a new instance of a Redux store which allows the sharing of state between X number of components.
 */
export function createStore(reducer, actions) {
    const { dispatch, ...props } = redux.createStore(reducer, redux.applyMiddleware(t.default ?? t));
    const boundActions = actions && redux.bindActionCreators(actions, dispatch);

    return { ...props, dispatch, boundActions };
}

/**
 * @function useRedux
 * ---
 * Associates a store that has been initialised with the `createStore` function from above with the current
 * node. Unlike `useMethods` which is designed for local component state, the `useRedux` adapters allows for
 * sharing state between components and as such is a little more verbose in terms of configuring actions
 * and action types.
 */
export default function useRedux({ node, render }) {
    return ({ getState, boundActions, dispatch, subscribe }) => {
        const state = getState();
        const redux = { state, actions: boundActions, dispatch };

        if (!nodes.has(node)) {
            subscribe(function useRedux() {
                render();
            });

            nodes.add(node);
        }

        return redux;
    };
}
