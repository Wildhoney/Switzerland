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
export default (store, handler = () => true) => {

    return props => {

        const has = subscriptions.has(props.node);

        // Subscribe to the store only if we haven't done so already.
        !has && subscriptions.set(props.node, store.subscribe(() => handler(store.getState()) && props.render()));

        return { ...props, store: store.getState(), dispatch: store.dispatch };

    };

};
