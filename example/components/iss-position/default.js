import { create, include, once, redux, html, element, pathFor } from '../../../src/switzerland';
import { pipe } from 'ramda';
import { get } from 'axios';
import { camelizeKeys } from 'humps';
import moment from 'moment';
import { store } from './redux';

/**
 * @method update
 * @return {Function}
 */
const update = () => {

    return dispatch => {

        dispatch({ type: 'LOADING' });

        get('/current').then(response => {
            const model = camelizeKeys(response.data);
            dispatch({ type: 'UPDATE', model });
        });
    };

};

/**
 * @method fetch
 * @return {void}
 */
const fetch = once(props => props.dispatch(update()));

/**
 * @constant interval
 * @param {Object} props
 * @return {void}
 */
const interval = once(props => setInterval(props.render, 2000));

create('iss-position', pipe(redux(store), include(pathFor('css/default.css')), fetch, props => {

    const { store, dispatch } = props;
    const image = pathFor(`images/flags/${store.flag}`);

    return (
        <section>

            {store.latitude && store.longitude && !store.loading ? (

                <span>
                    <label>ISS is currently flying over</label>
                    <h1>{store.country ? store.country : 'An Ocean Somewhere'}</h1>

                    {store.flag ? <img className="flag" src={image} /> : ''}

                    <iss-astronauts />

                    <div className="coordinates">
                        {store.latitude}, {store.longitude}
                    </div>

                </span>

            ) : <img className="loading" src={pathFor('images/loading.svg')} />}

            <button
                className={store.loading ? 'loading' : ''}
                onclick={() => dispatch(update())}
                >

                <div className="update">Update Location</div>
                <iss-updated />

            </button>

        </section>
    );

}));

create('iss-astronauts', pipe(redux(store), include(pathFor('css/astronauts.css')), props => {

    return (
        <div className="astronauts">

            <h3>{props.store.people.length} Astronauts:</h3>

            <ul className="astronauts">
                {props.store.people.map(name => <li>{name}</li>)}
            </ul>

        </div>
    );

}));

create('iss-updated', pipe(redux(store), interval, props => {

    return (
        <datetime>
            (Updated {moment(props.store.updated).fromNow()})
        </datetime>
    );

}));
