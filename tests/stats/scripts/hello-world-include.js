import { create, element, pipe, path } from '../../../src/switzerland';
import html from '../../../src/middleware/html';
import include from '../../../src/middleware/include';

create('hello-world', pipe(include(path('default.css')), html(() => {
    return <h1>Hello World!</h1>;
})));
