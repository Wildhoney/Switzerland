import { dirname } from 'path';
import express from 'express';
import renderToString from '../../src/universal';

const app = express();
const rootPath = __dirname + '/../index.html';

app.get('/universal.html', async (request, response) => {
    const markup = await renderToString(rootPath);
    response.send(markup);
});

app.use(express.static(dirname(rootPath)));
app.listen(3000);
