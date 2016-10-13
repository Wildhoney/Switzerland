import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

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
 * @constant event
 * @type {Object}
 */
export const event = {
    UPDATE: Symbol('update'),
    LOADING: Symbol('loading'),
    TIMEOUT: Symbol('timeout')
};

/**
 * @constant store
 * @type {Object}
 */
export const store = createStore(reducer, applyMiddleware(thunk));

/**
 * @method reducer
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
function reducer(state = initialState, action) {

    switch (action.type) {

        case event.UPDATE:
            return { ...state, ...action.model, updated: Date.now(), loading: false, error: false };

        case event.TIMEOUT:
            return { ...state, loading: false, error: true };

        case event.LOADING:
            return { ...state, loading: true, error: false };

        default:
            return state;

    }

}
