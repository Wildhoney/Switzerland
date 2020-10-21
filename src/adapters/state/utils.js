import { bindActionCreators } from 'redux';

const states = new Map();

const subscriptions = new WeakSet();

/**
 * @function useSimpleState
 * ---
 * State management that is akin to React's `useState` hook with a tuple returned for state and
 * updating the state. Takes an initial state as its only argument.
 */
export function useSimpleState({ map, render }) {
    try {
        throw new Error();
    } catch (error) {
        const key = error.stack.split('\n')[3];

        const setState = (newState) => {
            states.set(key, newState);
            render();
        };

        return states.has(key)
            ? [states.get(key), setState]
            : (() => {
                  states.set(key, map);
                  return [map, setState];
              })();
    }
}

/**
 * @function useReduxState
 * ---
 * Passing in a store utilises the Redux state management. You can use multiple store instances in
 * your application for synchronising data between your components, or a separate store for each
 * to have a more complex local state.
 */
export function useReduxState({ store, options, node, render }) {
    if (!subscriptions.has(node)) {
        store.subscribe(function useRedux() {
            render();
        });

        subscriptions.add(node);
    }

    return [
        store.getState(),
        options.actionCreators ? bindActionCreators(options.actionCreators, store.dispatch) : store.dispatch,
    ];
}
