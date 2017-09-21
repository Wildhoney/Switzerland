import express from 'express';
import renderToString from '../../src/universal';

const app = express();

app.get('/', async (request, response) => {
    const markup = await renderToString(__dirname + '/../index.html');
    response.send(markup);
});

app.listen(3000);
