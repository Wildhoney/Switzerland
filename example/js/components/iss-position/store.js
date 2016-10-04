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
 * @constant store
 * @type {Object}
 */
export const store = createStore(locator, applyMiddleware(thunk));

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
