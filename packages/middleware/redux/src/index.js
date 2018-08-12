import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

/**
 * @function redux ∷ ∀ a b c d. { (String (a → b), (c → { action: String, payload: d } → c) }
 */
export default function redux({ actions: actions_, reducer }) {
    const subscriptions = new WeakSet();
    const store = createStore(reducer, applyMiddleware(thunk));
    const actions = bindActionCreators(actions_, store.dispatch);
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
