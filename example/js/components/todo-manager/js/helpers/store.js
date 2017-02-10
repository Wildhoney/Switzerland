import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { generate } from 'shortid';

const ADD_TODO = Symbol('todo/add');
const REMOVE_TODO = Symbol('todo/remove');
const EDIT_TODO = Symbol('todo/toggle');

/**
 * @constant initialState
 * @type {Object}
 */
const initialState = {
    todos: []
};

/**
 * @method todos
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
function todos(state = initialState, action) {

    switch (action.type) {

        case ADD_TODO:
            return { ...state, todos: [...state.todos, action.model] };

        case REMOVE_TODO:
            return { ...state, todos: state.todos.filter(model => model.id !== action.model.id) };

        case EDIT_TODO:
            const index = state.todos.findIndex(model => model.id === action.model.id);
            return { ...state, todos: [
                ...state.todos.slice(0, index),
                { ...action.model },
                ...state.todos.slice(index + 1)
            ]};

    }

    return state;

}

/**
 * @constant store
 * @type {Store}
 */
export const store = createStore(todos, applyMiddleware(thunk));

/**
 * @method addTodo
 * @param {String} text
 * @return {Object}
 */
export const addTodo = text => {
    const model = { id: generate(), text, done: false, created: Date.now() };
    return store.dispatch({ type: ADD_TODO, model });
};

/**
 * @method putTodo
 * @param {Object} model
 * @return {Object}
 */
export const putTodo = model => {
    return store.dispatch({ type: ADD_TODO, model });
};

/**
 * @method editTodo
 * @param {Object} model
 * @return {Object}
 */
export const editTodo = model => {
    return store.dispatch({ type: EDIT_TODO, model });
};

/**
 * @method removeTodo
 * @param {Object} model
 * @return {Object}
 */
export const removeTodo = model => {
    return store.dispatch({ type: REMOVE_TODO, model });
};
