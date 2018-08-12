import { create } from '@switzerland/core';
import html from '@switzerland/vdom';
import attrs from '@switzerland/attrs';
import styles from './styles.css';

create(
    'todo-app',
    attrs(),
    html(() => (
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
                {/* <li><em>Completed:</em> {todos.filter(x => x.done).length} of {todos.length} {plural('task', todos.length)}</li> */}
                {/* <li><em>Dimensions:</em> {props.dimensions.width}&times;{props.dimensions.height}</li> */}
            </ul>
        </section>
    ))
);
