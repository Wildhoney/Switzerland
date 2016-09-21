import pipe from 'ramda/src/pipe';
import { component, attrs, element } from '../../../src/switzerland';

component('business-card', pipe(attrs, props => {

    return (
        <section className="name">
            <h1>Name: {props.attrs.name}</h1>
        </section>
    );

}));
