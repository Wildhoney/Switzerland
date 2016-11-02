import { get } from 'axios';
import { addSession, changeSession } from './store';

const name = 'todos';

const getStorage = () => {
    return JSON.parse(localStorage.getItem(name)) || [];
};

const appendStorage = model => {
    localStorage.setItem(name, JSON.stringify([...getStorage(), model]));
};

const lastSession = () => {
    const items = getStorage();
    return items.length ? items.splice(items.length - 1, 1)[0] : null;
};

export const init = props => {

    getStorage().forEach(addSession);

    const model = lastSession();

    if (model) {
        changeSession(model);
        return props;
    }

    return new Promise(resolve => {

        get('/create').then(response => {

            const id = response.data.id;
            const qr = response.data.image;
            const model = { id, updated: Date.now() };

            addSession(model);
            changeSession(model);
            appendStorage(model);

            resolve({ ...props, qr });

        });

    });

};
