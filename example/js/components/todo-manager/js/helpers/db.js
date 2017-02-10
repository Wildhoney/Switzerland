import { once, identity } from 'ramda';
import { putTodo } from '../helpers/store';

/**
 * @constant NAME
 * @type {String}
 */
const NAME = 'todos';

/**
 * @constant VERSION
 * @type {Number}
 */
const VERSION = 1;

/**
 * @constant MODE
 * @type {Object}
 */
const MODE = { READWRITE: 'readwrite', READONLY: 'readonly' };

/**
 * @param {Object} props
 * @return {Promise}
 */
export default once(props => {

    return new Promise(resolve => {

        const open = window.indexedDB.open('database', VERSION);

        open.addEventListener('upgradeneeded', () => {

            if (!open.result.objectStoreNames.contains(NAME)) {
                open.result.createObjectStore(NAME, { keyPath: 'id' });
            }

        });

        open.addEventListener('error', () => {

            // Continue without offline support.
            resolve({ ...props, db: { active: false, put: identity, delete: identity }});

        });

        open.addEventListener('success', () => {

            const db = open.result;

            /**
             * @method put
             * @param {Object} model
             * @return {void}
             */
            const put = model => {
                const tx = db.transaction(NAME, MODE.READWRITE);
                const store = tx.objectStore(NAME);
                store.put(model);
            };

            /**
             * @method remove
             * @param {Object} model
             * @return {void}
             */
            const remove = model => {
                const tx = db.transaction(NAME, MODE.READWRITE);
                const store = tx.objectStore(NAME);
                store.delete(model.id);
            };

            // Fetch all of the store todos in the database.
            db.transaction(NAME, MODE.READONLY).objectStore(NAME).getAll().addEventListener('success', response => {

                // Update the store with the saved records.
                response.target.result.forEach(putTodo);

                // ...And then resolve the middleware, passing in the `put` function.
                resolve({ ...props, db: { active: true, put, delete: remove }});

            });

        });

    });

});
