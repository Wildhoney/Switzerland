import { once, identity } from 'ramda';

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
export default once(() => {

    return new Promise(resolve => {

        const open = window.indexedDB.open('database', VERSION);

        open.addEventListener('upgradeneeded', () => {

            if (!open.result.objectStoreNames.contains(NAME)) {
                open.result.createObjectStore(NAME, { keyPath: 'id' });
            }

        });

        open.addEventListener('error', () => {

            // Continue without offline support.
            resolve({ active: false, add: identity, edit: identity, remove: identity, todos: [] });

        });

        open.addEventListener('success', () => {

            const db = open.result;

            /**
             * @method add
             * @param {Object} model
             * @return {void}
             */
            const add = model => {
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

                // ...And then resolve the middleware, passing in the required properties.
                resolve({ active: true, add, edit: add, remove, todos: response.target.result });

            });

        });

    });

});
