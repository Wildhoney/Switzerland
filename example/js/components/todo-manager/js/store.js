import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { generate } from 'shortid';

const initialState = {
    todos: [],
    active: null,
    sessions: []
};

const ADD_TODO = Symbol('todo/add');
const REMOVE_TODO = Symbol('todo/remove');
const TODO_TOGGLE = Symbol('todo/toggle');
const SESSION_ADD = Symbol('session/add');
const SESSION_CHANGE = Symbol('session/change');

function todos(state = initialState, action) {

    switch (action.type) {

        case ADD_TODO:
            const model = { id: generate(), value: action.item, done: false };
            return { ...state, todos: [...state.todos, model] };

        case REMOVE_TODO:
            return { ...state, todos: state.todos.filter(model => model.id !== action.item.id) };

        case TODO_TOGGLE:
            const index = state.todos.findIndex(model => model.id === action.item.id);
            return { ...state, todos: [
                ...state.todos.slice(0, index),
                { value: action.item.value, done: !action.item.done },
                ...state.todos.slice(index + 1)
            ]};

        case SESSION_ADD:
            return { ...state, sessions: [...state.sessions, action.item] };

        case SESSION_CHANGE:
            return { ...state, active: action.item.id };


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
    store.dispatch({ type: TODO_TOGGLE, item });
};

export const addSession = item => {
    store.dispatch({ type: SESSION_ADD, item });
};

export const changeSession = item => {
    store.dispatch({ type: SESSION_CHANGE, item });
};
