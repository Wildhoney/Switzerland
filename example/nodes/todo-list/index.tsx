import { create, h, use, node } from 'switzerland';
import { actionCreators, store } from '../todo-app/utils';
// import { store, actionCreators } from '../../utils/store.js';
import List from './components/List';
import Nothing from './components/Nothing';
// import db from '../../utils/db.js';

export default create('todo-list', () => {
    const path = use.path(import.meta.url);
    const [state, dispatch, actions] = use.store(store, actionCreators);
    const hasTodos = state.list.length > 0;

    return (
        <>
            <ul>{hasTodos ? <List list={state.list} actions={actions} /> : <Nothing />}</ul>

            <node.StyleSheet href={path('./styles/index.css')} />
            <node.StyleSheet href={path('./styles/mobile.css')} media="(max-width: 768px)" />
            <node.StyleSheet href={path('./styles/print.css')} media="print" />
        </>
    );
});
