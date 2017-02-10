import by from 'sort-by';
import { create, element, pipe, path } from '../../../../../../src/switzerland';
import { html, redux, include, once } from '../../../../../../src/middleware';
import { store, removeTodo, editTodo } from '../helpers/store';
import indexedDb from '../helpers/db';

create('todo-list', pipe(once(indexedDb), redux(store), include(path('../css/todo-list.css')), html(props => {

    /**
     * @method handleEdit
     * @param {Object} model
     * @return {void}
     */
    const handleEdit = model => {
        const result = editTodo({ ...model, done: !model.done });
        props.db.put(result.model);
    };

    /**
     * @method handleRemove
     * @param {Object} model
     * @return {void}
     */
    const handleRemove = model => {
        const result = removeTodo(model);
        props.db.delete(result.model);
    };

    return (
        <ul>

            {!props.db.active ? <li className="error">Due to an error you currently don't have any offline support.</li> : ''}

            {props.redux.todos.length ? [...props.redux.todos].sort(by('created')).map(model => {

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
