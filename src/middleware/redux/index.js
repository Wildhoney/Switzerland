import * as r from 'https://cdn.jsdelivr.net/npm/@wildhoney/redux@4.0.1/es/redux.js';
import thunk from 'https://cdn.jsdelivr.net/npm/redux-thunk@2.3.0/es/index.js';

/**
 * @function redux ∷ ∀ a b c d. { (String (a → b), (c → { action: String, payload: d } → c) }
 */
export default function redux({ actions, reducer }) {
    const subscriptions = new WeakSet();
    const store = r.createStore(reducer, r.applyMiddleware(thunk));
    const actions_ = r.bindActionCreators(actions, store.dispatch);
    const dispatch = store.dispatch;

    return props => {
        const state = store.getState();
        const redux = { state, actions: actions_, dispatch };

        if (!subscriptions.has(props.node)) {
            store.subscribe(() => props.render({ redux }));
            subscriptions.add(props.node);
        }

        return { ...props, redux };
    };
}
