import pipe from 'ramda/src/pipe';
import { create, attrs, state, element } from '../../../src/switzerland';

/**
 * @constant initialState
 * @type {Object}
 */
const initialState = { age: 30 };

create('person-age', pipe(attrs, props => {
    return <h1>Age: {props.attrs.age}</h1>
}));

create('business-card', pipe(attrs, state, props => {

    const state = { ...initialState, ...props.state };
    const { attrs, setState } = props;

    return (
        <section className="name">

            <h1>Name: {attrs.name}</h1>
            <person-age dataset={{ age: state.age }}></person-age>

            <button onclick={() => setState({ age: state.age - 1 })}>
                Decrease Age
            </button>

            <button onclick={() => setState({ age: state.age + 1 })}>
                Increase Age
            </button>

        </section>
    );

}));
