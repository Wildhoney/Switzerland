import { create, element, path, pipe } from '../../../../../src/switzerland';
import { html, attrs, include, once, redux } from '../../../../../src/middleware';
import { get } from 'axios';
import { camelizeKeys } from 'humps';
import moment from 'moment';
import { store, event } from './store';

/**
 * @constant IS_TESTING
 * @type {Boolean}
 */
const IS_TESTING = typeof jasmine !== 'undefined';

/**
 * @method update
 * @param {Number} timeout
 * @return {Function}
 */
const update = (timeout = 10000) => {

    return dispatch => {

        dispatch({ type: event.LOADING });

        get('/position', { timeout }).then(response => {

            const model = camelizeKeys(response.data);
            dispatch({ type: event.UPDATE, model });

        }).catch(() => dispatch({ type: event.TIMEOUT }));

    };

};

/**
 * @method fetch
 * @return {void}
 */
const fetch = props => {
    const timeout = Number(props.attrs.timeout);
    props.dispatch(update(timeout));
};

/**
 * @constant worker
 * @return {Promise|Object}
 */
const worker = props => {

    return IS_TESTING ? props : new Promise(resolve => {

        window.navigator.serviceWorker.register(path('worker.js'), { scope: '/' }).then(worker => {
            resolve({ ...props, worker });
        }).catch(() => resolve(props));

    });

};

/**
 * @constant interval
 * @param {Object} props
 * @return {void}
 */
const interval = once(props => setInterval(props.render, 2000));

/**
 * @method resize
 * @param {Object} props
 * @return {Object}
 */
const resize = props => {

    /**
     * @method addClass
     * @param {String} className
     * @return {void}
     */
    const addClass = className => {
        props.node.classList.remove('small');
        props.node.classList.remove('medium');
        props.node.classList.remove('large');
        props.node.classList.add(className);
    };

    if ('ResizeObserver' in window) {

        const resizeable = new ResizeObserver(() => {

            const { width } = getComputedStyle(props.node);
            const size = parseInt(width);

            switch (true) {
                case (size < 400): addClass('small'); break;
                case (size < 600): addClass('medium'); break;
                default:           addClass('large'); break;
            }

        });

        resizeable.observe(props.node);

    }

    return props;

};

create('iss-position', pipe(once(worker), once(resize), attrs, redux(store), once(fetch), include(path('css/default.css')), html(props => {

    const { redux, dispatch } = props;
    const image = path(`images/flags/${redux.flag}`);

    return (
        <section>

            {!redux.loading && !redux.error ? (

                <span>
                    <label>ISS is currently flying over</label>
                    <h1>{redux.country ? redux.country : 'An Ocean Somewhere'}</h1>

                    {redux.country ? '' : <img className="ocean" src={path('images/jellyfish.svg')} />}
                    {redux.flag ? <img className="flag" src={image} /> : ''}

                    <iss-astronauts />

                    <div className="coordinates">
                        {redux.latitude}, {redux.longitude}
                    </div>

                </span>

            ) : ''}

            {redux.loading ? <img className="loading" src={path('images/loading.svg')} /> : ''}
            {redux.error ? <label className="error">Please try again a little later.</label> : ''}

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
