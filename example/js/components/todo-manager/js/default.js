import { always } from 'ramda';
import moment from 'moment';
import { generate } from 'shortid';
import axios from 'axios';
import { create, element, pipe, path } from '../../../../../src/switzerland';
import { html, state, once, redux, include, attrs, await as waitFor } from '../../../../../src/middleware';
import { store, addTodo, removeTodo, editTodo, setSession } from './store';
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

    const handleAdd = event => {
        event.preventDefault();
        const model = { id: generate(), value: props.state.value };
        addTodo(model);
        axios.post(`/session/${props.redux.active.id}/task`, model);
        props.setState({ value: '' });
    };

    return (
        <form onsubmit={handleAdd}>

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

    const byDate = (a, b) => a.added > b.added;

    const handleRemove = model => {
        removeTodo(model);
        axios.delete(`/session/${props.redux.active.id}/task/${model.id}`);
    };

    return (
        <ul>

            {props.redux.todos.sort(byDate).length ? props.redux.todos.map(item => {

                return (
                    <li
                        key={item.id}
                        className={`${item.done ? 'done' : ''} ${item.synced ? 'synced' : ''}`}
                        >
                        <p onpointerup={() => editTodo({ ...item, done: !item.done })}>{item.value}</p>
                        <button onpointerup={() => handleRemove(item)}>Delete</button>
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
