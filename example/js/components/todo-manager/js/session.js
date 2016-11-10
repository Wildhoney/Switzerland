import axios from 'axios';
import { dissoc, uniqBy } from 'ramda';
import { addSession, setSession, addTodo, editTodo, removeTodo, clearTodos, store } from './store';

/**
 * @method setupEventSource
 * @param {Object} model
 * @return {void}
 */
const setupEventSource = model => {

    /**
     * @method findTodo
     * @param {Object} model
     * @return {Object|null}
     */
    const findTodo = model => {
        const id = model.id;
        return store.getState().todos.find(model => model.id === id);
    };

    const eventSource = new EventSource(`/retrieve/${model.id}/stream`);
    eventSource.addEventListener('message', event => {

        const item = JSON.parse(event.data);
        const model = item.model && findTodo(item.model);

        switch (item.type) {

            case 'add':
                model ? editTodo({ ...model, synced: true }) : addTodo(item.model);
                break;

            case 'delete':
                model && removeTodo(model);
                break;


        }

    });

};

/**
 * @method load
 * @param {Number|null} [model]
 * @return {Promise}
 */
export const load = (model = null) => {

    const url = model ? `/session/${model.id}` : '/session';
    const method = model ? 'get' : 'post';

    return new Promise(resolve => {

        axios[method](url).then(response => {

            const model = response.data;

            saveSession(dissoc('image', dissoc('todos', model)));
            fromStorage().forEach(addSession);
            setSession(model);

            // Add the persisted todos if we received any.
            model.todos.forEach(addTodo);

            resolve(model);
            setupEventSource(model);

        });

    });

};

const name = 'todos';

/**
 * @method fromStorage
 * @return {Array}
 */
export const fromStorage = () => {
    return JSON.parse(localStorage.getItem(name)) || [];
};

/**
 * @method saveSession
 * @param {Number} item
 * @return {void}
 */
const saveSession = item => {
    const items = uniqBy(model => model.id, [item, ...fromStorage()]);
    localStorage.setItem(name, JSON.stringify(items));
};

/**
 * @method init
 * @param {Object} props
 * @return {Promise}
 */
export const init = props => {

    return new Promise(resolve => {
        const items = fromStorage();
        const model = items.length ? items.splice(items.length - 1, 1)[0] : null;
        load(model).then(() => resolve(props));
    });

};
