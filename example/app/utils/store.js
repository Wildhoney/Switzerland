import { m } from '/vendor/index.js';
import indexedDb from './db.js';

const initialState = {
    list: [],
};

const actionTypes = {
    ADD: Symbol('todo/add'),
    REMOVE: Symbol('todo/remove'),
    MARK: Symbol('todo/mark'),
};

const getId = () => {
    const integers = new Uint32Array(2);
    window.crypto.getRandomValues(integers);
    return integers.toString();
};

const createModel = (text) => ({
    id: getId(),
    text,
    done: false,
    created: Date.now(),
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD: {
            const models = [].concat(action.payload);
            return { list: [...state.list, ...models] };
        }

        case actionTypes.REMOVE:
            return {
                ...state,
                list: state.list.filter((model) => model.id !== action.payload),
            };
        case actionTypes.MARK:
            return {
                list: state.list.map((model) =>
                    model.id === action.payload ? { ...model, done: !model.done } : model
                ),
            };
        default:
            return state;
    }
};

const actions = {
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

export default m.redux(reducer, actions);
