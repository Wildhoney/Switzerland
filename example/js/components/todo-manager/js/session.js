import axios from 'axios';
import { dissoc, uniqBy } from 'ramda';
import { addSession, setSession, addTodo, clearTodos, store } from './store';

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

            const eventSource = new EventSource(`/retrieve/${model.id}/stream`);
            eventSource.addEventListener('message', event => {

                const item = JSON.parse(event.data);

                switch (item.type) {

                    case 'add':
                        const exists = !!store.getState().todos.find(model => model.id === item.model.id);
                        !exists && addTodo(item.model);
                        break;

                }

            });

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
