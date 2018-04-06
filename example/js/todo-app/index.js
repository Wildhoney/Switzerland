import by from 'sort-by';
import * as R from 'ramda';
import { store, addTodo, putTodo, removeTodo, markTodo } from './store';
import plural from 'pluralize';
import db from './db';
import { create, h } from '../../../src/switzerland';
import * as m from '../../../src/middleware';
import { validate, once } from '../../../src/utilities';

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
 * @method worker
 * @param {Object} props
 * @return {Promise}
 */
const worker = m.once(async props => {

    try {

        // Register the service worker to allow the app to work offline.
        navigator.serviceWorker && await navigator.serviceWorker.register(`${m.path}/build-worker.js`, { scope: '/' });
        return props;

    } catch (err) {

        // Continue even if the service worker fails to load.
        return props;

    }


});

/**
 * @method init
 * @param {Object} props
 * @return {Promise}
 */
const init = m.once(async props => {
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

const position = props => {

    const isBottom = props.attrs.logo === 'bottom';

    return {
        orderPosition: isBottom ? 1 : -1,
        borderColour: isBottom ? 'transparent' : 'rgba(0, 0, 0, 0.1)'
    };

};

create('todo-app', worker, redux, init, m.attrs(), m.vars(position), m.include('../../css/todo-app/todo-app.css'), m.adapt(), m.html(props => {

    const isBottom = props.attrs.logo === 'bottom';
    const { todos } = props.store;

    return (
        <section class="todo-app">
            <_todo-input />
            <_todo-list />
            <h1>
                <a href="https://github.com/Wildhoney/Switzerland">
                    <img src="/images/todo-app/logo.png" alt="Switzerland" />
                </a>
            </h1>
            <ul class="dimensions">
                <li><em>Completed:</em> {todos.filter(x => x.done).length} of {todos.length} {plural('task', todos.length)}</li>
                <li>
                    <em>Logo: </em>
                    <a class={isBottom ? 'active': ''} onclick={() => props.node.setAttribute('logo', 'bottom')}>
                        Bottom
                    </a>
                    /
                    <a class={!isBottom ? 'active': ''} onclick={() => props.node.setAttribute('logo', 'top')}>
                        Top
                    </a>
                </li>
                <li><em>Dimensions:</em> {props.dimensions.width}&times;{props.dimensions.height}</li>
            </ul>
        </section>
    );

}), m.wait('_todo-input', '_todo-list'));

create('todo-input', m.include('../../css/todo-app/todo-input.css'), redux, m.state({ value: '', isValid: false }), m.html(props => {

    /**
     * @method add
     * @param {Object} event
     * @return {Promise}
     */
    const add = async event => {
        event.preventDefault();
        await props.dispatch(addTodo(props.state.value));
        return props.setState({ value: '', isValid: false });
    };

    return (
        <form onsubmit={once(add)} novalidate>
            <input
                required
                type="text"
                name="todo"
                autoComplete="off"
                placeholder="What do you need to do?"
                value={props.state.value}
                oninput={e => props.setState({ value: e.target.value, isValid: validate(e).valid })}
                />
            <button type="submit" class="add" disabled={!props.state.isValid} />
        </form>
    );

}));

create('todo-list', m.include('../../css/todo-app/todo-list.css'), redux, m.html(props => {

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
                            onclick={once(() => props.dispatch(removeTodo(model.id)))}
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
