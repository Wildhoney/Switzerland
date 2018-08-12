import { create } from '@switzerland/core';
import html from '@switzerland/vdom';
import styles from './styles.css';
import store from '../../utils/store';

create(
    'todo-list',
    store,
    html(({ redux }) => (
        <ul>
            <style type="text/css">{styles.toString()}</style>

            {redux.state.list.map(model => {
                return (
                    <li class={model.done ? 'done' : ''}>
                        <p onclick={() => redux.actions.mark(model.id)}>
                            {model.text}
                        </p>
                        <button
                            class="delete"
                            onclick={() => redux.actions.remove(model.id)}
                        >
                            Delete
                        </button>
                    </li>
                );
            })}

            {!redux.state.list.length && (
                <li class="none">
                    <p>You have not added any todos yet.</p>
                </li>
            )}
        </ul>
    ))
);
