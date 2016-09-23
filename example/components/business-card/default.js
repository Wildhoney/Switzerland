import pipe from 'ramda/src/pipe';
import { create, attrs, state, include, redux, element } from '../../../src/switzerland';
import { createStore } from 'redux';

/**
 * @method counter
 * @param {Number} state
 * @param {Object} action
 * @return {number}
 */
function counter(state = 0, action) {

    switch (action.type) {

        case 'INCREMENT':
            return state + 1;

        case 'DECREMENT':
            return state - 1;

        default:
            return state

    }

}

const store = createStore(counter);

/**
 * @constant initialState
 * @type {Object}
 */
const initialState = { age: 30 };

/**
 * @constant files
 * @type {Array}
 */
const files = [
    'components/business-card/default.css'
];

create('business-card', pipe(include(...files), attrs, redux(store), state, props => {

    const state = { ...initialState, ...props.state };
    const { attrs, setState } = props;

    return (
        <section className="name">

            <ul>
                <li>Name: {attrs.name}</li>
                <li>Age: {state.age}</li>
            </ul>

            <button onclick={() => setState({ age: state.age - 1 })}>
                Decrease Age
            </button>

            <button onclick={() => setState({ age: state.age + 1 })}>
                Increase Age
            </button>

            <button onclick={() => store.dispatch({ type: 'INCREMENT' })}>
                Increment {props.store}
            </button>

        </section>
    );

}));
