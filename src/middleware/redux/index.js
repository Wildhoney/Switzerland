import * as r from 'https://cdn.jsdelivr.net/npm/@wildhoney/redux@4.0.1/es/redux.js';
import thunk from 'https://cdn.jsdelivr.net/npm/redux-thunk@2.3.0/es/index.js';

/**
 * @function redux ∷ ∀ a b c d. (a → Object String b) → Object String c → d
 */
export default function redux(reducer, actions) {
    const subscriptions = new WeakSet();
    const { dispatch, getState, subscribe } = r.createStore(
        reducer,
        r.applyMiddleware(thunk)
    );
    const actions_ = r.bindActionCreators(actions, dispatch);

    return props => {
        const state = getState();
        const redux = { state, actions: actions_, dispatch };

        if (!subscriptions.has(props.node)) {
            subscribe(() => props.render({ redux }));
            subscriptions.add(props.node);
        }

        return { ...props, redux };
    };
}
