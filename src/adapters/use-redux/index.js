import * as r from 'redux';
import t from 'redux-thunk';

const redux = {
    createStore: r.default?.createStore ?? r.createStore,
    applyMiddleware: r.default?.applyMiddleware ?? r.applyMiddleware,
    bindActionCreators: r.default?.bindActionCreators ?? r.bindActionCreators,
};

export const nodes = new WeakSet();

export function newRedux(reducer, actions) {
    const { dispatch, ...props } = redux.createStore(reducer, redux.applyMiddleware(t.default ?? t));
    const boundActions = actions && redux.bindActionCreators(actions, dispatch);

    return { ...props, dispatch, boundActions };
}

export default function useRedux({ node, render }) {
    return ({ getState, boundActions, dispatch, subscribe }) => {
        const state = getState();
        const redux = { state, actions: boundActions, dispatch };

        if (!nodes.has(node)) {
            subscribe(() => render({ redux }));
            nodes.add(node);
        }

        return redux;
    };
}
