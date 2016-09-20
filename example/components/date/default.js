import { pipe } from 'ramda';
import { component, element, render, attrs } from '../../../src/switzerland';

component('business-card', pipe(attrs, ({ attrs }) => {

    return (
        <datetime>
            <h1>{attrs.name}</h1>
        </datetime>
    );

}));
