import { bindActionCreators } from 'redux';

const states = new Map();

const subscriptions = new WeakSet();

export function useKeyValueState({ map, render }) {
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

export function useReduxStore({ store, options, node, render }) {
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
