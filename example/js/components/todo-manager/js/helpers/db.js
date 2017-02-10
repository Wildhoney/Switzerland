import { once } from 'ramda';
import { putTodo } from '../helpers/store';

/**
 * @param {Object} props
 * @return {Promise}
 */
export default once(props => {

    return new Promise(resolve => {

        const open = window.indexedDB.open('database', 1);

        open.addEventListener('upgradeneeded', () => {
            open.result.createObjectStore('todos', { keyPath: 'id' });
        });

        open.addEventListener('success', () => {

            const db = open.result;
            const tx = db.transaction('todos', 'readonly');
            const store = tx.objectStore('todos');
            const all = store.getAll();

            /**
             * @method put
             * @param {Object} model
             * @return {void}
             */
            const put = model => {
                const tx = db.transaction('todos', 'readwrite');
                const store = tx.objectStore('todos');
                store.put(model);
            };

            /**
             * @method remove
             * @param {Object} model
             * @return {void}
             */
            const remove = model => {
                const tx = db.transaction('todos', 'readwrite');
                const store = tx.objectStore('todos');
                store.delete(model.id);
            };

            all.addEventListener('success', response => {

                // Update the store with the saved records.
                response.target.result.forEach(putTodo);

                // ...And then resolve the middleware, passing in the `put` function.
                resolve({ ...props, db: { put, delete: remove }});

            });

        });

        return props;

    });

});
