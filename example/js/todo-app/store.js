import { generate } from 'shortid';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import indexedDb from './db';

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
 * @param {String} text
 * @return {Function}
 */
export const addTodo = text => {

    return async dispatch => {
        const db = await indexedDb();
        const model = { id: generate(), text, done: false };
        db.add(model);
        return dispatch({ type: actionTypes.ADD_TODO, result: model });
    };

};

/**
 * @method putTodo
 * @param {Object} model
 * @return {Object}
 */
export const putTodo = model => {
    return { type: actionTypes.ADD_TODO, result: model };
};

/**
 * @method markTodo
 * @param {String} id
 * @return {Object}
 */
export const markTodo = id => {

    return async (dispatch, getState) => {
        const db = await indexedDb();
        const model = getState().todos.find(model => model.id === id);
        db.edit({ ...model, done: !model.done });
        return dispatch({ type: actionTypes.MARK_TODO, result: id });
    };

};

/**
 * @method removeTodo
 * @param {String} id
 * @return {Function}
 */
export const removeTodo = id => {

    return async (dispatch, getState) => {
        const db = await indexedDb();
        const model = getState().todos.find(model => model.id === id);
        db.remove(model);
        return dispatch({ type: actionTypes.REMOVE_TODO, result: id });
    };

};

/**
 * @constant INITIAL_STATE
 * @type {Object}
 */
const INITIAL_STATE = {
    todos: []
};

/**
 * @method reducer
 * @param {Object} state 
 * @param {Object} action
 * @return {Object}
 */
function reducer(state = INITIAL_STATE, action) {

    switch (action.type) {

        case actionTypes.ADD_TODO:
            return { ...state, todos: [...state.todos, action.result] };
            
        case actionTypes.REMOVE_TODO:
            return { ...state, todos: state.todos.filter(model => model.id !== action.result) };

        case actionTypes.MARK_TODO:
            const todos = state.todos.map(model => {
                return model.id === action.result ? { ...model, done: !model.done } : model;
            });
            return { ...state, todos };

    }

    return state;

}

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
export const store = createStoreWithMiddleware(reducer);
