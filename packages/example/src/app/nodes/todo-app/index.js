import plural from 'pluralize';
import { create } from '@switzerland/core';
import html from '@switzerland/vdom';
import attrs from '@switzerland/attrs';
import adapt from '@switzerland/adapt';
import store from '../../utils/store';
import styles from './styles.css';

create(
    'todo-app',
    attrs(),
    adapt(),
    store,
    html(({ redux, dimensions }) => (
        <section class="todo-app">
            <style type="text/css">{styles.toString()}</style>
            <_todo-input />
            <_todo-list />
            <h1>
                <a href="https://github.com/Wildhoney/Switzerland">
                    <img src="./logo.png" alt="Switzerland" />
                </a>
            </h1>
            <ul class="dimensions">
                <li>
                    <em>Completed:</em>{' '}
                    {redux.state.list.filter(x => x.done).length} of{' '}
                    {redux.state.list.length}{' '}
                    {plural('task', redux.state.list.length)}
                </li>
                {dimensions && (
                    <li>
                        <em>Dimensions:</em> {Math.round(dimensions.width)}
                        &times;
                        {Math.round(dimensions.height)}
                    </li>
                )}
            </ul>
        </section>
    ))
);
