const NAME = 'todos';

const VERSION = 1;

const MODE = { READWRITE: 'readwrite', READONLY: 'readonly' };

const defaults = {
    active: false,
    add: () => {},
    edit: () => {},
    remove: () => {},
    todos: []
};

export default () => {
    return new Promise(resolve => {
        try {
            const open = window.indexedDB.open('database', VERSION);

            open.addEventListener('upgradeneeded', () => {
                if (!open.result.objectStoreNames.contains(NAME)) {
                    open.result.createObjectStore(NAME, { keyPath: 'id' });
                }
            });

            open.addEventListener('error', () => {
                // Continue without offline support.
                resolve(defaults);
            });

            open.addEventListener('success', () => {
                const db = open.result;

                const add = model => {
                    const tx = db.transaction(NAME, MODE.READWRITE);
                    const store = tx.objectStore(NAME);
                    store.put(model);
                };

                const remove = model => {
                    const tx = db.transaction(NAME, MODE.READWRITE);
                    const store = tx.objectStore(NAME);
                    store.delete(model.id);
                };

                // Fetch all of the store todos in the database.
                db.transaction(NAME, MODE.READONLY)
                    .objectStore(NAME)
                    .getAll()
                    .addEventListener('success', response => {
                        // ...And then resolve the middleware, passing in the required properties.
                        resolve({
                            active: true,
                            add,
                            edit: add,
                            remove,
                            todos: response.target.result
                        });
                    });
            });
        } catch {
            resolve(defaults);
        }
    });
};
