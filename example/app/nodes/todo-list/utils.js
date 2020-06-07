import db from '../../utils/db.js';

export async function initialise(props) {
    const { todos } = await db();
    props.redux.actions.put(todos);
    return props;
}
