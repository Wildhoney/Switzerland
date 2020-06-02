import * as r from 'redux';
import t from 'redux-thunk';

const redux = {
    createStore: r.default?.createStore ?? r.createStore,
    applyMiddleware: r.default?.applyMiddleware ?? r.applyMiddleware,
    bindActionCreators: r.default?.bindActionCreators ?? r.bindActionCreators,
};

export const nodes = new WeakSet();

/**
 * @function redux
 */
export default (reducer, actions) => {
    const { dispatch, getState, subscribe } = redux.createStore(
        reducer,
        redux.applyMiddleware(t.default ?? t)
    );
    const boundActions = actions && redux.bindActionCreators(actions, dispatch);

    return function redux(props) {
        const state = getState();
        const redux = { state, actions: boundActions, dispatch };

        if (!nodes.has(props.node)) {
            subscribe(() => props.render({ redux }));
            nodes.add(props.node);
        }

        return { ...props, redux };
    };
};
