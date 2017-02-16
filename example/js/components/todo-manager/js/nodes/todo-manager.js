import { create, element, pipe, path } from '../../../../../../src/switzerland';
import once from '../../../../../../src/middleware/once';
import html from '../../../../../../src/middleware/html';
import waitFor from '../../../../../../src/middleware/await';
import include from '../../../../../../src/middleware/include';

/**
 * @method register
 * @param {Object} props
 * @return {Promise}
 */
const register = async props => {

    // Register the service worker to allow the app to work offline.
    await navigator.serviceWorker.register(path('worker.js'), { scope: '/' });
    return props;

};

create('todo-manager', pipe(waitFor('todo-add', 'todo-list'), once(register), include(path('../css/todo-manager.css')), html(() => {

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
