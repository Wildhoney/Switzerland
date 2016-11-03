import { basename } from 'path';
import { existsSync } from 'fs';
import http from 'http';
import cors from 'cors';
import express from 'express';
import SSE from 'express-sse';
import { generate } from 'shortid';
import qr from 'qr-image';

const app = express();
const server = http.createServer(app);
const isHeroku = 'HEROKU_APP_NAME' in process.env;
const domain = isHeroku ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/` : process.env.TODO_URL;

app.get('/*',(req, res, next) => {
    res.set('Service-Worker-Allowed', '/');
    next();
});

app.use(express.static(__dirname + '/example'));
app.use(cors());

const initialise = (request, response) => {

    const id = 'id' in request.params ? request.params.id : generate();
    const image = qr.imageSync(`${domain}/#/${id}`, { type: 'svg' });
    const todos = [
        { id: 1, value: 'example #1', done: false },
        { id: 2, value: 'example #2', done: true }
    ];

    const sse = new SSE([todos]);
    app.get(`/retrieve/${id}/stream`, sse.init);

    response.send({ id, date: Date.now(), image });
    response.end();

};

app.get('/create', initialise);
app.get('/retrieve/:id', initialise);

server.listen(process.env.PORT || 5000);
