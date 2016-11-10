import { always } from 'ramda';
import moment from 'moment';
import { generate } from 'shortid';
import { create, element, pipe, path } from '../../../../../../src/switzerland';
import { html, once, redux, include, attrs } from '../../../../../../src/middleware';
import { store, setSession } from '../helpers/store';
import { init } from '../helpers/session';

create('todo-manage', pipe(once(init),  redux(store), attrs, include(path('../css/todo-manage.css')), html(props => {

    const { sessions, active } = props.redux;
    const src = `data:image/svg+xml;charset=utf-8,${active.image}`;

    /**
     * @method handleChange
     * @param {Object} event
     * @return {void}
     */
    const handleChange = event => {
        const index = event.target.selectedIndex;
        const model = sessions[index];
        setSession(model);
    };

    return (
        <footer>
            <a href="https://github.com/Wildhoney/Switzerland">Switzerland</a>
            <form>

                {sessions.length ? (
                    <select onchange={handleChange}>

                        {sessions.map(model => {

                            return (
                                <option value={model.id} selected={active === model.id}>
                                    Updated: {moment(model.updated).format('lll')}
                                </option>
                            );

                        })}

                    </select>
                ) : ''}

                <img src={src} alt="" />

            </form>
        </footer>
    );

})));
