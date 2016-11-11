import axios from 'axios';
import { always } from 'ramda';
import { create, element, pipe, path } from '../../../../../../src/switzerland';
import { html, redux, include } from '../../../../../../src/middleware';
import { store, removeTodo, editTodo } from '../helpers/store';

/**
 * @method byDate
 * @param {Object} a
 * @param {Object} b
 * @return {Number}
 */
const byDate = (a, b) => a.added > b.added;

create('todo-list', pipe(redux(store), include(path('../css/todo-list.css')), html(props => {

    const classNames = `${item.done ? 'done' : ''} ${item.synced ? 'synced' : ''}`;

    /**
     * @method handleEdit
     * @param {Object} model
     * @return {void}
     */
    const handleEdit = model => {
        editTodo({ ...model, done: !model.done });
    };

    /**
     * @method handleRemove
     * @param {Object} model
     * @return {void}
     */
    const handleRemove = model => {
        removeTodo(model);
        axios.delete(`/session/${props.redux.active.id}/task/${model.id}`);
    };

    return (
        <ul>

            {props.redux.todos.sort(byDate).length ? props.redux.todos.map(item => {

                return (
                    <li key={item.id} className={classNames}>

                        <p onpointerup={() => handleEdit(item)}>{item.value}</p>

                        <button onpointerup={() => handleRemove(item)}>
                            Delete
                        </button>

                    </li>
                );
            }) : <li className="none"><p>You haven't added any todos yet.</p></li>}

        </ul>
    );

})));
