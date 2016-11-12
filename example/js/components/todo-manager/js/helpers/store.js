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
            const model = { id: generate(), text: action.text, done: false };
            return { ...state, todos: [...state.todos, model] };

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
 * @return {void}
 */
export const addTodo = text => {
    store.dispatch({ type: ADD_TODO, text });
};

/**
 * @method editTodo
 * @param {Object} model
 * @return {void}
 */
export const editTodo = model => {
    store.dispatch({ type: EDIT_TODO, model });
};

/**
 * @method removeTodo
 * @param {Object} model
 * @return {void}
 */
export const removeTodo = model => {
    store.dispatch({ type: REMOVE_TODO, model });
};
