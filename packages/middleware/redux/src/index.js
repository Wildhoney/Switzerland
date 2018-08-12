import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

/**
 * @function redux ∷ ∀ a b c d. { (String (a → b), (c → { action: String, payload: d } → c) }
 */
export default function redux({ actions: actions_, reducer }) {
    const store = createStore(reducer, applyMiddleware(thunk));
    const actions = bindActionCreators(actions_, store.dispatch);
    const subscriptions = new WeakSet();
    const dispatch = store.dispatch;

    return props => {
        const state = store.getState();

        if (!subscriptions.has(props.node)) {
            store.subscribe(() =>
                props.render({ redux: { state, actions, dispatch } })
            );
            subscriptions.add(props.node);
        }

        return { ...props, redux: { state, actions, dispatch } };
    };
}
