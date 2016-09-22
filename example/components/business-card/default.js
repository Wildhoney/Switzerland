import pipe from 'ramda/src/pipe';
import { create, attrs, state, include, element } from '../../../src/switzerland';

/**
 * @constant initialState
 * @type {Object}
 */
const initialState = { age: 30 };

create('business-card', pipe(include('components/business-card/default.css'), attrs, state, props => {

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

        </section>
    );

}));
