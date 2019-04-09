import * as r from 'https://cdn.jsdelivr.net/npm/redux@4.0.1/es/redux.mjs';
import thunk from 'https://cdn.jsdelivr.net/npm/redux-thunk@2.3.0/es/index.js';

/**
 * @constant nodes ∷ WeakSet
 */
export const nodes = new WeakSet();

/**
 * @function redux ∷ ∀ a b c d. (a → Object String b) → Object String c → d
 */
export default (reducer, actions) => {
    const { dispatch, getState, subscribe } = r.createStore(reducer, r.applyMiddleware(thunk));
    const actions_ = actions && r.bindActionCreators(actions, dispatch);

    return function redux(props) {
        const state = getState();
        const redux = { state, actions: actions_, dispatch };

        if (!nodes.has(props.node)) {
            subscribe(() => props.render({ redux }));
            nodes.add(props.node);
        }

        return { ...props, redux };
    };
};
