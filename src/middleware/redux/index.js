import * as r from 'https://cdn.jsdelivr.net/npm/@wildhoney/redux@4.0.1/es/redux.js';
import thunk from 'https://cdn.jsdelivr.net/npm/redux-thunk@2.3.0/es/index.js';

/**
 * @function redux ∷ ∀ a b c d. { (String (a → b), (c → { action: String, payload: d } → c) }
 */
export default function redux({ actions: actions_, reducer }) {
    const subscriptions = new WeakSet();
    const store = r.createStore(reducer, r.applyMiddleware(thunk));
    const actions = r.bindActionCreators(actions_, store.dispatch);
    const dispatch = store.dispatch;

    return props => {
        const state = store.getState();
        const redux = { state, actions, dispatch };

        if (!subscriptions.has(props.node)) {
            store.subscribe(() => props.render({ redux }));
            subscriptions.add(props.node);
        }

        return { ...props, redux };
    };
}
