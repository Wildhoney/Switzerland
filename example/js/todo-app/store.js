import { generate } from 'shortid';

/**
 * @constant actionTypes
 * @type {Object}
 */
const actionTypes = {
    ADD_TODO: Symbol('todo/add'),
    REMOVE_TODO: Symbol('todo/remove'),
    MARK_TODO: Symbol('todo/mark')
};

/**
 * @method addTodo
 * @param {String} value
 * @return {Object}
 */
export const addTodo = value => {
    return { type: actionTypes.ADD_TODO, result: value };
};

/**
 * @method markTodo
 * @param {String} id
 * @return {Object}
 */
export const markTodo = id => {
    return { type: actionTypes.MARK_TODO, result: id };
};

/**
 * @method removeTodo
 * @param {String} id
 * @return {Object}
 */
export const removeTodo = id => {
    return { type: actionTypes.REMOVE_TODO, result: id };
};

/**
 * @constant INITIAL_STATE
 * @type {Object}
 */
const INITIAL_STATE = {
    todos: []
};

export const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case actionTypes.ADD_TODO:
            const model = { id: generate(), text: action.result, done: false };
            return { ...state, todos: [...state.todos, model] };
            
        case actionTypes.REMOVE_TODO:
            return { ...state, todos: state.todos.filter(model => model.id !== action.result) };

        case actionTypes.MARK_TODO:
            const todos = state.todos.map(model => {
                return model.id === action.result ? { ...model, done: !model.done } : model;
            });
            return { ...state, todos };

    }

    return state;

};
