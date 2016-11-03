import { get } from 'axios';
import { dissoc, uniqBy } from 'ramda';
import { addSession, setSession, addTodo, clearTodos } from './store';

/**
 * @method load
 * @param {Number|null} [model]
 * @return {Promise}
 */
export const load = (model = null) => {

    const url = model ? `/retrieve/${model.id}` : '/create';

    return new Promise(resolve => {

        get(url).then(response => {

            const model = response.data;

            saveSession(dissoc('image', model));
            fromStorage().forEach(addSession);
            setSession(model);

            resolve(model);

            const eventSource = new EventSource(`/retrieve/${model.id}/stream`);
            eventSource.addEventListener('message', event => {

                const todos = JSON.parse(event.data);
                clearTodos();
                todos.forEach(addTodo);

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
