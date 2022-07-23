import { useEffect } from 'preact/hooks';
// export async function createServiceWorker({ path, window }) {
//     try {
//         window.navigator.serviceWorker &&
//             (await window.navigator.serviceWorker.register(path('../../../utils/worker.js'), {
//                 scope: '/',
//             }));
//     } catch {}
// }
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { use } from 'switzerland';

export function useResize(): null | { width: number; height: number } {
    const env = use.env();
    const [state, setState] = use.state<null | ResizeObserverEntry['contentRect']>(null);

    useEffect(() => {
        const observer = new window.ResizeObserver((entries) =>
            entries.forEach(function useResize(entry) {
                setState(entry.contentRect);
            })
        );

        observer.observe(env.node);

        return () => observer.unobserve(env.node);
    }, [env.node]);

    return state;
}

const initialState = {
    list: [],
};

const actionTypes = {
    ADD: Symbol('todo/add'),
    REMOVE: Symbol('todo/remove'),
    MARK: Symbol('todo/mark'),
};

function getId() {
    const integers = new Uint32Array(2);
    window.crypto.getRandomValues(integers);
    return integers.toString();
}

function createModel(text) {
    return {
        id: getId(),
        text,
        done: false,
        created: Date.now(),
    };
}

function reducer(state = initialState, event) {
    switch (event.type) {
        case actionTypes.ADD: {
            const models = [].concat(event.payload);
            return { list: [...state.list, ...models] };
        }

        case actionTypes.REMOVE:
            return {
                ...state,
                list: state.list.filter((model) => model.id !== event.payload),
            };
        case actionTypes.MARK:
            return {
                list: state.list.map((model) => (model.id === event.payload ? { ...model, done: !model.done } : model)),
            };
        default:
            return state;
    }
}

export const actionCreators = {
    add: (text) => async (dispatch) => {
        // const db = await indexedDb();
        const model = createModel(text);
        // db.add(model);
        return dispatch({ type: actionTypes.ADD, payload: model });
    },
    put: (models) => ({ type: actionTypes.ADD, payload: models }),
    remove: (id) => async (dispatch, getState) => {
        // const db = await indexedDb();
        const model = getState().list.find((model) => model.id === id);
        // db.remove(model);
        return dispatch({ type: actionTypes.REMOVE, payload: id });
    },
    mark: (id) => async (dispatch, getState) => {
        // const db = await indexedDb();
        const model = getState().list.find((model) => model.id === id);
        // db.edit({ ...model, done: !model.done });
        return dispatch({ type: actionTypes.MARK, payload: id });
    },
};

export const store = createStore(reducer, applyMiddleware(thunk));
