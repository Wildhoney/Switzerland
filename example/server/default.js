import { basename } from 'path';
import { existsSync } from 'fs';
import http from 'http';
import cors from 'cors';
import express from 'express';
import { generate } from 'shortid';
import qr from 'qr-image';

const app = express();
const server = http.createServer(app);
const domain = 'HEROKU_APP_NAME' in process.env ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/`
                                                : process.env.TODO_URL;

app.get('/*',(req, res, next) => {
    res.set('Service-Worker-Allowed', '/');
    next();
});

app.use(express.static(__dirname + '/example'));
app.use(cors());

const qrFor = id => {
    return qr.imageSync(`${domain}/#/${id}`, { type: 'svg' });
};

app.get('/create', (request, response) => {
    const id = generate();
    const image = qrFor(id);
    response.send({ id, image });
});

app.get('/retrieve/:id', (request, response) => {
    const id = request.params.id;
    const image = qrFor(id);
    response.send({ id, image });
});

server.listen(process.env.PORT || 5000);
