import { merge } from 'tili';
import { bind, wire } from 'hyperhtml';
import { html, render, reparentNodes } from 'lit-html';
import by from 'sort-by';
import * as R from 'ramda';
import plural from 'pluralize';
import * as m from '../../../src/middleware';
import { create } from '../../../src/switzerland';
import { validate, once } from '../../../src/utilities';
import { store, addTodo, putTodo, removeTodo, markTodo } from './store';
import db from './db';

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

/**
 * @method position
 * @param {Object} props
 * @return {Object}
 */
const position = props => {

    const isBottom = props.attrs.logo === 'bottom';

    return {
        orderPosition: isBottom ? 1 : -1,
        borderColour: isBottom ? 'transparent' : 'rgba(0, 0, 0, 0.1)'
    };

};

function clear(obj) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            delete obj[key];
        }
    }
    return obj;
}

function hyperHtmlRenderer(renderRoot, getTree, props) {
    const html = wire(renderRoot);
    const render = obj => html`${obj}`;

    if (!renderRoot.__renderProps) {
        // HyperHTML needs the same object to keep a weak reference.
        renderRoot.__renderProps = {};
        // Rendering an empty array will generate a hyperHTML html comment
        // which is used to be able to render partials between nodes.
        const initial = render([]);
        renderRoot.appendChild(initial);
    }

    const renderProps = renderRoot.__renderProps;
    merge(clear(renderProps), props);

    return render(getTree(renderProps));
}

create('todo-app', worker, redux, init, m.attrs(), m.vars(position), m.include('../../css/todo-app/todo-app.css'), m.adapt(), m.renderer(hyperHtmlRenderer, props => {

    const isBottom = props.attrs.logo === 'bottom';
    const { todos } = props.store;

    return wire(props)`
        <section class="todo-app">
            <todo-input></todo-input>
            <todo-list></todo-list>
            <h1>
                <a href="https://github.com/Wildhoney/Switzerland">
                    <img src="/images/todo-app/logo.png" alt="Switzerland" />
                </a>
            </h1>
            <ul class="dimensions">
                <li><em>Completed:</em> ${todos.filter(x => x.done).length} of ${todos.length} ${plural('task', todos.length)}</li>
                <li>
                    <em>Logo: </em>
                    <a class=${isBottom ? 'active' : ''} onclick=${() => props.node.setAttribute('logo', 'bottom')}>
                        Bottom
                    </a>
                    /
                    <a class=${isBottom ? '' : 'active'} onclick=${() => props.node.setAttribute('logo', 'top')}>
                        Top
                    </a>
                </li>
                <li><em>Dimensions:</em> ${props.dimensions.width}&times;${props.dimensions.height}</li>
            </ul>
        </section>
    `;

}), m.wait('todo-input', 'todo-list'));

create('todo-input', m.include('../../css/todo-app/todo-input.css'), redux, m.state({ value: '', isValid: false }), m.renderer(hyperHtmlRenderer, props => {

    /**
     * @method add
     * @return {Promise}
     */
    const add = async () => {
        await props.dispatch(addTodo(props.state.value));
        return props.setState({ value: '', isValid: false });
    };

    return wire(props)`
        <form onsubmit=${once(add)} novalidate>
            <input
                required
                type="text"
                name="todo"
                autoFocus="on"
                autoComplete="off"
                placeholder="What do you need to do?"
                value=${props.state.value}
                oninput=${e => props.setState({ value: e.target.value, isValid: validate(e).valid })}
                />
            <button type="submit" class="add" disabled=${!props.state.isValid} />
        </form>
    `;

}));

create('todo-list', m.include('../../css/todo-app/todo-list.css'), redux, m.renderer(hyperHtmlRenderer, props => {

    return wire(props)`<ul>
        ${R.sort(by('created'), props.store.todos).map(model => wire(model)`
            <li class=${model.done ? 'done' : ''}>
                <p onclick=${() => props.dispatch(markTodo(model.id))}>
                    ${model.text}
                </p>
                <button
                    class="delete"
                    onclick=${once(() => props.dispatch(removeTodo(model.id)))}
                    >
                    Delete
                </button>
            </li>
        `)}
        ${!props.store.todos.length && wire()`<li class="none"><p>You have not added any todos yet.</p></li>`}
    </ul>`;

}));
