import { always } from 'ramda';
import moment from 'moment';
import { create, element, pipe, path } from '../../../../../src/switzerland';
import { html, state, once, redux, include, attrs, await as waitFor } from '../../../../../src/middleware';
import { store, addTodo, removeTodo, toggleTodo, setSession } from './store';
import { init } from './session';

create('todo-manager', pipe(waitFor('todo-add', 'todo-list'), include(path('../css/default.css')), html(props => {

    return (
        <section className="todo-manager">
            <div className="container">
                <todo-add />
                <todo-list />
                <todo-manage />
            </div>
        </section>
    );

})));

create('todo-add', pipe(redux(store, always(false)), state({ value: '' }), include(path('../css/todo-add.css')), html(props => {

    const handleSubmit = event => {
        event.preventDefault();
        addTodo(props.state.value);
        props.setState({ value: '' });
    };

    return (
        <form onsubmit={handleSubmit}>

            <input
                type="text"
                value={props.state.value}
                placeholder="Specify an item to add to your todo list..."
                oninput={event => props.setState({ value: event.target.value })}
                />

            <button disabled={!props.state.value.length}>Add Todo</button>

        </form>
    );

})));

create('todo-list', pipe(redux(store), include(path('../css/todo-list.css')), html(props => {

    return (
        <ul>

            {props.redux.todos.length ? props.redux.todos.map(item => {

                return (
                    <li
                        key={item.id}
                        className={item.done ? 'done': ''}
                        >
                        <p onpointerup={() => toggleTodo(item)}>{item.value}</p>
                        <button onpointerup={() => removeTodo(item)}>Delete</button>
                    </li>
                );
            }) : <li className="none"><p>You haven't added any todos yet.</p></li>}

        </ul>
    );

})));

create('todo-manage', pipe(once(init), redux(store), attrs, include(path('../css/todo-manage.css')), html(props => {

    const { sessions, active } = props.redux;
    const src = `data:image/svg+xml;charset=utf-8,${active.image}`;

    const handleChange = event => {
        const index = event.target.selectedIndex;
        const model = sessions[index];
        setSession(model);
    };

    return (
        <footer>
            <a href="https://github.com/Wildhoney/Switzerland">Switzerland</a>
            <form>

                {sessions.length ? (
                    <select onchange={handleChange}>

                        {sessions.map(model => {

                            return (
                                <option value={model.id} selected={active === model.id}>
                                    Updated: {moment(model.updated).format('llll')}
                                </option>
                            );

                        })}

                    </select>
                ) : ''}

                <img src={src} alt="" />

            </form>
        </footer>
    );

})));
