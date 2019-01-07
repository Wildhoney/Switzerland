import { m } from '/vendor/index.js';
import db from '../../utils/db.js';

export const retrieve = async props => {
    const { todos } = await db();
    props.redux.actions.put(todos);
    return props;
};

export const serviceWorker = (path, scope) => {
    return m.once(async props => {
        try {
            navigator.serviceWorker &&
                (await navigator.serviceWorker.register(path, {
                    scope
                }));
            return props;
        } catch (_) {
            return props;
        }
    });
};
