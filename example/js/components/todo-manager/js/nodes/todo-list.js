import { always } from 'ramda';
import { create, element, pipe, path } from '../../../../../../src/switzerland';
import { html, redux, include } from '../../../../../../src/middleware';
import { store, removeTodo, editTodo } from '../helpers/store';

create('todo-list', pipe(redux(store), include(path('../css/todo-list.css')), html(props => {

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
    };

    return (
        <ul>

            {props.redux.todos.length ? props.redux.todos.map(model => {

                return (
                    <li key={model.id} className={model.done ? 'done' : ''}>

                        <p onclick={() => handleEdit(model)}>{model.text}</p>

                        <button className="delete" onclick={() => handleRemove(model)}>
                            Delete
                        </button>

                    </li>
                );
            }) : <li className="none"><p>You have not added any todos yet.</p></li>}

        </ul>
    );

})));
