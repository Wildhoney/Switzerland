import { create, element } from '../../../src/switzerland';
import html from '../../../src/middleware/html';

create('hello-world', html(() => {
    return <h1>Hello World!</h1>;
}));
