import { init } from '/vendor/index.js';
import db from '../../utils/db.js';

const path = init(import.meta.url);

export const retrieve = async props => {
    const { todos } = await db();
    props.redux.actions.put(todos);
    return props;
};
