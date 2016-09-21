import pipe from 'ramda/src/pipe';
import { component, attrs, state, element } from '../../../src/switzerland';

/**
 * @constant initialState
 * @type {Object}
 */
const initialState = { age: 1 };

component('business-card', pipe(attrs, state, props => {

    const state = { ...initialState, ...props.state };

    return (
        <section className="name">

            <h1>Name: {props.attrs.name}</h1>
            <h2>Age: {state.age}</h2>

            <button onclick={() => props.setState({ age: state.age - 1 })}>
                Decrease Age
            </button>

            <button onclick={() => props.setState({ age: state.age + 1 })}>
                Increase Age
            </button>

        </section>
    );

}));
