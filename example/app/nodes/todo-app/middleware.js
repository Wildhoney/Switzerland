import db from '../../utils/db.js';

export const retrieve = async props => {
    const { todos } = await db();
    props.redux.actions.put(todos);
    return props;
};
