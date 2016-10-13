import { create, element, html, include, once, redux, path, pipe } from '../../../../../src/switzerland';
import { get } from 'axios';
import { camelizeKeys } from 'humps';
import moment from 'moment';
import { store, event } from './store';

/**
 * @method update
 * @return {Function}
 */
const update = () => {

    return dispatch => {

        dispatch({ type: event.LOADING });

        get('/position').then(response => {
            const model = camelizeKeys(response.data);
            dispatch({ type: event.UPDATE, model });
        });

    };

};

/**
 * @method fetch
 * @return {void}
 */
const fetch = once(props => props.dispatch(update()));

/**
 * @constant worker
 * @return {void}
 */
const worker = once(props => {

    return new Promise(resolve => {

        window.navigator.serviceWorker.register(path('worker.js'), { scope: '/' }).then(worker => {
            resolve({ ...props, worker });
        });

    });

});

/**
 * @constant interval
 * @param {Object} props
 * @return {void}
 */
const interval = once(props => setInterval(props.render, 2000));

create('iss-position', pipe(worker, redux(store), fetch, include(path('css/default.css')), html(props => {

    const { redux, dispatch } = props;
    const image = path(`images/flags/${redux.flag}`);

    return (
        <section>

            {redux.latitude && redux.longitude && !redux.loading ? (

                <span>
                    <label>ISS is currently flying over</label>
                    <h1>{redux.country ? redux.country : 'An Ocean Somewhere'}</h1>

                    {redux.flag ? <img className="flag" src={image} /> : ''}

                    <iss-astronauts />

                    <div className="coordinates">
                        {redux.latitude}, {redux.longitude}
                    </div>

                </span>

            ) : <img className="loading" src={path('images/loading.svg')} />}

            <button
                className={redux.loading ? 'loading' : ''}
                onclick={() => dispatch(update())}
                >

                <div className="update">Update Location</div>
                <iss-updated />

            </button>

        </section>
    );

})));

create('iss-astronauts', pipe(redux(store), include(path('css/astronauts.css')), html(props => {

    return (
        <div className="astronauts">

            <h3>{props.redux.people.length} Astronauts:</h3>

            <ul className="astronauts">
                {props.redux.people.map(name => <li>{name}</li>)}
            </ul>

        </div>
    );

})));

create('iss-updated', pipe(redux(store), interval, html(props => {

    return (
        <datetime>
            (Updated {moment(props.redux.updated).fromNow()})
        </datetime>
    );

})));
