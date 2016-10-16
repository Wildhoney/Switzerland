import curry from 'ramda/src/curry';

/**
 * @constant subscriptions
 * @type {WeakMap}
 */
const subscriptions = new WeakMap();

/**
 * @param {Object} store
 * @param {Function} [handler]
 * @return {Function}
 */
export default curry((store, handler = () => true) => {

    return props => {

        const hasSubscription = subscriptions.has(props.node);
        const state = store.getState();

        // Subscribe to the store only if we haven't done so already.
        !hasSubscription && subscriptions.set(props.node, store.subscribe(() => handler(store.getState(), state) && props.node.render()));

        return { ...props, redux: state, dispatch: store.dispatch };

    };

});
