import { create, element, html, include, once, redux, pathFor } from '../../../../src/switzerland';
import { pipe } from 'ramda';
import { get } from 'axios';
import { camelizeKeys } from 'humps';
import moment from 'moment';
import { store } from './store';

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

create('iss-position', pipe(redux(store), fetch, include(pathFor('css/default.css')), html(props => {

    const { redux, dispatch } = props;
    const image = pathFor(`images/flags/${redux.flag}`);

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

            ) : <img className="loading" src={pathFor('images/loading.svg')} />}

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

create('iss-astronauts', pipe(redux(store), include(pathFor('css/astronauts.css')), html(props => {

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
