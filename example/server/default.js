import { basename } from 'path';
import { existsSync } from 'fs';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import redis from 'redis';
import SSE from 'express-sse';
import { generate } from 'shortid';
import qr from 'qr-image';

const app = express();
const server = http.createServer(app);
const isHeroku = 'HEROKU_APP_NAME' in process.env;
const domain = isHeroku ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/` : process.env.TODO_URL;
const client = redis.createClient(process.env.REDIS_URL);
const emitters = new Map();

app.get('/*',(req, res, next) => {
    res.set('Service-Worker-Allowed', '/');
    next();
});

app.use(express.static(__dirname + '/example'));
app.use(bodyParser.json());
app.use(cors());

const fetch = id => {

    return new Promise(resolve => {

        client.smembers(id, (err, data) => {
            const models = data.map(model => JSON.parse(model));
            resolve(models);
        });

    });

};

const initialise = (request, response) => {

    const sessionId = 'sessionId' in request.params ? request.params.sessionId : generate();
    const image = qr.imageSync(`${domain}/#/${sessionId}`, { type: 'svg' });

    fetch(sessionId).then(todos => {

        if (!emitters.get(sessionId)) {

            const sse = new SSE();
            emitters.set(sessionId, sse);

            app.get(`/retrieve/${sessionId}/stream`, sse.init);

        }

        response.send({ id: sessionId, date: Date.now(), image, todos });
        response.end();

    });

};

app.post('/session', initialise);
app.get('/session/:sessionId', initialise);
app.post('/session/:sessionId/task', (request, response) => {

    const { sessionId } = request.params;
    const { id: taskId, value } = request.body;
    const model = { id: taskId, value, added: Date.now(), done: false, synced: true };

    client.sadd(sessionId, JSON.stringify(model));

    response.send({ success: true });
    emitters.get(sessionId).send({ type: 'add', model });

});
app.delete('/session/:sessionId/task/:taskId', (request, response) => {

    const { sessionId, taskId } = request.params;

    fetch(sessionId).then(models => {

        const model = models.find(model => model.id === taskId);

        client.srem(sessionId, [JSON.stringify(model)]);

        response.send({ success: true });
        emitters.get(sessionId).send({ type: 'delete', model });

    });

});

server.listen(process.env.PORT || 5000);
