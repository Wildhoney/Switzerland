import { always } from 'ramda';
import { create, element, pipe, path } from '../../../../../../src/switzerland';
import { html, state, redux, include, once } from '../../../../../../src/middleware';
import { store, addTodo } from '../helpers/store';
import indexedDb from '../helpers/db';

create('todo-add', pipe(once(indexedDb), redux(store, always(false)), include(path('../css/todo-add.css')), html(props => {

    /**
     * @method handleAdd
     * @param {Object} text
     * @return {void}
     */
    const handleAdd = text => {
        const result = addTodo(text);
        props.db.put(result.model);
        props.render({ text: '' });
    };

    /**
     * @constant text
     * @type {String}
     */
    const text = props.text || '';

    return (
        <form onsubmit={event => event.preventDefault(void handleAdd(text))}>

            <input
                type="text"
                value={text}
                placeholder="What do you need to do?"
                oninput={event => props.render({ text: event.target.value })}
                />

            <button className="add" disabled={!text.length} />

        </form>
    );

})));
