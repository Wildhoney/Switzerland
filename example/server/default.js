import { basename } from 'path';
import { existsSync } from 'fs';
import http from 'http';
import cors from 'cors';
import express from 'express';
import { generate } from 'shortid';
import opener from 'opener';

const app = express();
const server = http.createServer(app);
const isHeroku = 'HEROKU_APP_NAME' in process.env;

app.get('/*',(req, res, next) => {
    res.set('Service-Worker-Allowed', '/');
    next();
});

app.use(express.static(__dirname + '/example'));
app.use(cors());

server.listen(process.env.PORT || 5000);
!isHeroku && opener('http://localhost:5000');
