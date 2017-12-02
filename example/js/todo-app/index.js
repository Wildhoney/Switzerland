import { createStore } from 'redux';
import { reducer, addTodo, removeTodo, markTodo } from './store';
import { create, h } from '../../../src/switzerland';
import { html, include, wait, state } from '../../../src/middleware';

const store = createStore(reducer);

const redux = props => {
    !props.prevProps && store.subscribe(() => props.render({ ...props, store: store.getState() }));
    return { ...props, store: store.getState(), dispatch: store.dispatch };
};

create('todo-app', include('../../css/todo-app/todo-app.css'), redux, html(props => {

    return (
        <section class="todo-app">
            <todo-input />
            <todo-list />
            <h1>
                <a href="https://github.com/Wildhoney/Switzerland">
                    <img src="/images/todo-app/logo.png" alt="Switzerland" />
                </a>
            </h1>
        </section>
    );

}), wait('todo-input', 'todo-list'));

create('todo-input', include('../../css/todo-app/todo-input.css'), redux, state({ value: '' }), html(props => {

    const add = event => {
        event.preventDefault();
        props.dispatch(addTodo(props.state.value));
        props.render({ value: '' });
    };

    return (
        <form onsubmit={add}>
            <input
                type="text"
                placeholder="What do you need to do?"
                value={props.state.value}
                oninput={e => props.render({ value: e.target.value })}
                />
            <button
                class="add"
                disabled={!props.state.value}>
            </button>
        </form>
    );

}));

create('todo-list', include('../../css/todo-app/todo-list.css'), redux, html(props => {

    return (
        <ul>

            {props.store.todos.map(model => {

                return (
                    <li class={model.done ? 'done' : ''}>
                        <p onclick={() => props.dispatch(markTodo(model.id))}>
                            {model.text}
                        </p>
                        <button
                            class="delete"
                            onclick={() => props.dispatch(removeTodo(model.id))}
                            >
                            Delete
                        </button>
                    </li>
                );

            })}

            {!props.store.todos.length && <li class="none"><p>You have not added any todos yet.</p></li>}

        </ul>
    );

}));
