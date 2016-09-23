import { create, include, once, redux, html, element } from '../../../src/switzerland';
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
 * @constant files
 * @type {Object}
 */
const files = [
    'components/iss-locator/default.css'
];

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

create('iss-locator', pipe(redux(store), include(...files), fetch, props => {

    console.log('iss-locator');

    const { store, dispatch } = props;
    const image = store.country.replace(/\s+/g, '-').toLowerCase();
    const backgroundImage = `url(components/iss-locator/images/flags/${image}.png)`;

    return (
        <section>

            {store.latitude && store.longitude && !store.loading ? (

                <span>
                    <label>ISS is currently flying over</label>
                    <h1>{store.country ? store.country : 'An Ocean Somewhere'}</h1>

                    {store.country ? (
                        <div className="flag" style={{ backgroundImage }} />
                    ) : ''}

                    <div className="astronauts">

                        <h3>{store.people.length} Astronauts:</h3>

                        <ul className="astronauts">
                            {store.people.map(name => <li>{name}</li>)}
                        </ul>

                    </div>

                    <div className="coordinates">
                        {store.latitude}, {store.longitude}
                    </div>

                </span>

            ) : <img className="loading" src="components/iss-locator/images/loading.svg" />}

            <button
                className={store.loading ? 'loading' : ''}
                onclick={() => dispatch(update())}
                >

                <div className="update">Update Location</div>
                <iss-last-updated></iss-last-updated>

            </button>

        </section>
    );

}));

create('iss-last-updated', pipe(redux(store), interval, props => {
    return <datetime>(Updated {moment(props.store.updated).fromNow()})</datetime>;
}));
