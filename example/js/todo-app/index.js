import by from 'sort-by';
import * as R from 'ramda';
import { store, addTodo, putTodo, removeTodo, markTodo } from './store';
import db from './db';
import { create, h } from '../../../src/switzerland';
import { html, include, wait, state, once, adapt } from '../../../src/middleware';

/**
 * @constant populate
 * @param {Object} props
 * @return {Object}
 */
const populate = R.once(async props => {
    const { todos } = await db();
    await Promise.all(todos.map(todo => props.dispatch(putTodo(todo))));
    return props;
});

/**
 * @method init
 * @param {Object} props
 * @return {Promise}
 */
const init = once(async props => {
    await populate(props);
    return props;
});

/**
 * @method redux
 * @param {Object} props
 * @return {Object}
 */
const redux = props => {
    !props.prevProps && store.subscribe(() => props.render({ ...props, store: store.getState() }));
    return { ...props, store: store.getState(), dispatch: store.dispatch };
};

create('todo-app', redux, init, include('../../css/todo-app/todo-app.css'), adapt(), html(props => {

    return (
        <section class="todo-app">
            <_todo-input />
            <_todo-list />
            <h1>
                <a href="https://github.com/Wildhoney/Switzerland">
                    <img src="/images/todo-app/logo.png" alt="Switzerland" />
                </a>
            </h1>
            <div class="dimensions">
                {props.dimensions.width}px &times; {props.dimensions.height}px
            </div>
        </section>
    );

}), wait('_todo-input', '_todo-list'));

create('todo-input', include('../../css/todo-app/todo-input.css'), redux, state({ value: '' }), html(props => {

    /**
     * @method add
     * @param {Object} event
     * @return {Promise}
     */
    const add = async event => {
        event.preventDefault();
        await props.dispatch(addTodo(props.state.value));
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

            {[...props.store.todos.sort(by('created'))].map(model => {

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
