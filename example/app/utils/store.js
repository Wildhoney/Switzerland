import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import indexedDb from './db.js';

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
        const db = await indexedDb();
        const model = createModel(text);
        db.add(model);
        return dispatch({ type: actionTypes.ADD, payload: model });
    },
    put: (models) => ({ type: actionTypes.ADD, payload: models }),
    remove: (id) => async (dispatch, getState) => {
        const db = await indexedDb();
        const model = getState().list.find((model) => model.id === id);
        db.remove(model);
        return dispatch({ type: actionTypes.REMOVE, payload: id });
    },
    mark: (id) => async (dispatch, getState) => {
        const db = await indexedDb();
        const model = getState().list.find((model) => model.id === id);
        db.edit({ ...model, done: !model.done });
        return dispatch({ type: actionTypes.MARK, payload: id });
    },
};

export const store = createStore(reducer, applyMiddleware(thunk.default ?? thunk));
