import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { generate } from 'shortid';

const initialState = {
    todos: [],
    active: {},
    sessions: []
};

const ADD_TODO = Symbol('todo/add');
const REMOVE_TODO = Symbol('todo/remove');
const CLEAR_TODOS = Symbol('todo/clear');
const TOGGLE_TODO = Symbol('todo/toggle');
const SESSION_ADD = Symbol('session/add');
const SESSION_SET = Symbol('session/change');

function todos(state = initialState, action) {

    switch (action.type) {

        case ADD_TODO:
            const { id = generate(), value = action.item, added = Date.now(), done = false } = action.item;
            const model = { id, value, added, done };
            return { ...state, todos: [...state.todos, model] };

        case REMOVE_TODO:
            return { ...state, todos: state.todos.filter(model => model.id !== action.item.id) };

        case TOGGLE_TODO:
            const index = state.todos.findIndex(model => model.id === action.item.id);
            return { ...state, todos: [
                ...state.todos.slice(0, index),
                { ...action.item, done: !action.item.done },
                ...state.todos.slice(index + 1)
            ]};


        case CLEAR_TODOS:
            return { ...state, todos: [] };

        case SESSION_ADD:
            return { ...state, sessions: [...state.sessions, action.item] };

        case SESSION_SET:
            return { ...state, active: action.item };


        default:
            return state;
    }

}

export const store = createStore(todos, applyMiddleware(thunk));

export const addTodo = item => {
    store.dispatch({ type: ADD_TODO, item });
};

export const removeTodo = item => {
    store.dispatch({ type: REMOVE_TODO, item });
};

export const toggleTodo = item => {
    store.dispatch({ type: TOGGLE_TODO, item });
};

export const clearTodos = () => {
    store.dispatch({ type: CLEAR_TODOS });
};

export const addSession = item => {
    store.dispatch({ type: SESSION_ADD, item });
};

export const setSession = item => {
    store.dispatch({ type: SESSION_SET, item });
};
