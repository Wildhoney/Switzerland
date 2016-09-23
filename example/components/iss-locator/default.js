import { create, include, once, redux, html, element } from '../../../src/switzerland';
import { pipe } from 'ramda';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { get } from 'axios';
import { camelizeKeys } from 'humps';
import moment from 'moment';

/**
 * @constant initialState
 * @type {Object}
 */
const initialState = {
    country: '',
    latitude: '',
    longitude: '',
    people: [],
    loading: true
};

/**
 * @constant store
 * @type {Object}
 */
const store = createStore(locator, applyMiddleware(thunk));

/**
 * @method locator
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
function locator(state = initialState, action) {

    switch (action.type) {

        case 'UPDATE':
            return { ...state, ...action.model, updated: Date.now(), loading: false };

        case 'LOADING':
            return { ...state, loading: true };

        default:
            return state;

    }

}

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
 * @method initial
 * @return {void}
 */
const initial = () => store.dispatch(update());

/**
 * @constant timeout
 * @param {Object} props
 * @return {void}
 */
const timeout = props => setInterval(props.render, 2000);

create('iss-locator', pipe(redux(store), include(...files), once(timeout), once(initial), html(props => {

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
                <datetime>(Updated {moment(store.updated).fromNow()})</datetime>

            </button>

        </section>
    );

})));
