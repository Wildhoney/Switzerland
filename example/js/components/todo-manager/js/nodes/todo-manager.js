import { generate } from 'shortid';
import { create, element, pipe, path } from '../../../../../../src/switzerland';
import { html, include, await as waitFor } from '../../../../../../src/middleware';

create('todo-manager', pipe(waitFor('todo-add', 'todo-list'), include(path('../css/default.css')), html(() => {

    return (
        <section className="todo-manager">
            <div className="container">
                <todo-add />
                <todo-list />
            </div>
        </section>
    );

})));
