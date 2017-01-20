import { create, element, pipe, path } from '../../../src/switzerland';
import html from '../../../src/middleware/html';
import include from '../../../src/middleware/include';
import state from '../../../src/middleware/state';

['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'].forEach(name => {

    create(`hello-${name.toLowerCase()}`, pipe(state({ name }), include(path('default.css')), html(props => {
        return <h1>Hello {props.name}!</h1>;
    })));

});
