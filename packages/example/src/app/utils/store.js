import { generate } from 'shortid';
import redux from '@switzerland/redux';

const initialState = {
    list: []
};

const actionTypes = {
    ADD: Symbol('todo/add'),
    REMOVE: Symbol('todo/remove'),
    MARK: Symbol('todo/mark')
};

const createModel = text => ({
    id: generate(),
    text,
    done: false,
    created: new Date()
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD:
            return { list: [...state.list, createModel(action.payload)] };

        case actionTypes.REMOVE:
            return {
                ...state,
                list: state.list.filter(model => model.id !== action.payload)
            };
        case actionTypes.MARK:
            return {
                list: state.list.map(
                    model =>
                        model.id === action.payload
                            ? { ...model, done: !model.done }
                            : model
                )
            };
        default:
            return state;
    }
};

const actions = {
    add: text => ({ type: actionTypes.ADD, payload: text }),
    remove: id => ({ type: actionTypes.REMOVE, payload: id }),
    mark: id => ({ type: actionTypes.MARK, payload: id })
};

export default redux({ reducer, actions });
