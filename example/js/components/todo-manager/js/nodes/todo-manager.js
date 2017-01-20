import { create, element, pipe, path } from '../../../../../../src/switzerland';
import { html, include, await as waitFor } from '../../../../../../src/middleware';

create('todo-manager', pipe(waitFor('todo-add', 'todo-list'), include(path('../css/todo-manager.css')), html(() => {

    return (
        <section className="todo-manager">

            <todo-add />
            <todo-list />

            <h1>
                <a href="https://github.com/Wildhoney/Switzerland">
                    <img src="/images/logo.png" alt="Switzerland" />
                </a>
            </h1>

        </section>
    );

})));
