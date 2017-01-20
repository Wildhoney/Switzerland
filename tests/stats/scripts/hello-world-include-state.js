import { create, element, pipe, path } from '../../../src/switzerland';
import html from '../../../src/middleware/html';
import include from '../../../src/middleware/include';
import state from '../../../src/middleware/state';

const initialState = {
    name: 'World'
};

create('hello-world', pipe(state(initialState), include(path('default.css')), html(props => {
    return <h1>Hello {props.name}!</h1>;
})));
