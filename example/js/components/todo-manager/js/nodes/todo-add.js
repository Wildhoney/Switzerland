import axios from 'axios';
import { generate } from 'shortid';
import { always } from 'ramda';
import { create, element, pipe, path } from '../../../../../../src/switzerland';
import { html, state, redux, include } from '../../../../../../src/middleware';
import { store, addTodo } from '../helpers/store';

create('todo-add', pipe(redux(store, always(false)), state({ value: '' }), include(path('../css/todo-add.css')), html(props => {

    /**
     * @method handleAdd
     * @param {Object} text
     * @return {void}
     */
    const handleAdd = text => {
        const model = { id: generate(), value: text };
        addTodo(model);
        axios.post(`/session/${props.redux.active.id}/task`, model);
        props.setState({ value: '' });
    };

    return (
        <form onsubmit={event => event.preventDefault(void handleAdd(props.state.value))}>

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
