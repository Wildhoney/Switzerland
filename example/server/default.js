import { basename } from 'path';
import { existsSync, readFileSync } from 'fs';
import http from 'http';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import opener from 'opener';
import format from 'string-template';
import { Z_BEST_COMPRESSION } from 'zlib';

import { create } from './src/switzerland';
import { render } from './src/universal';
import './example/js/components/todo-manager/js/todo-list.js';

const app = express();
const server = http.createServer(app);
const isHeroku = 'HEROKU_APP_NAME' in process.env;

app.get('/*',(req, res, next) => {
    res.set('Service-Worker-Allowed', '/');
    next();
});

app.get('/', async (req, res) => {

    const index = readFileSync('./example/index.html', 'utf-8');
    const app = await render('todo-list');

    res.send(format(index, {
        html: `<todo-manager>${app}</todo-manager>`
    }));

});

app.use(compression({ level: Z_BEST_COMPRESSION }));
app.use(express.static(__dirname + '/example'));
app.use(cors());

server.listen(process.env.PORT || 5000);
!isHeroku && opener('http://localhost:5000');
