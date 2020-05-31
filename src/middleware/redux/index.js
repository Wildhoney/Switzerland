import * as r from 'redux';
import thunk from 'redux-thunk';

export const nodes = new WeakSet();

/**
 * @function redux
 */
export default (reducer, actions) => {
    const { dispatch, getState, subscribe } = r.createStore(reducer, r.applyMiddleware(thunk));
    const boundActions = actions && r.bindActionCreators(actions, dispatch);

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
