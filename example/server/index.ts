import compression from 'compression';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';
import fmt from 'string-template';
import { preload, render } from 'switzerland';

import todoApp from '../nodes/todo-app';

const app = express();
app.use(cors());
app.use(compression());

const root = path.resolve('./example');
const vendor = path.resolve('./src');

const options = {
    path: process.env['DOMAIN'] ? `https://${process.env['DOMAIN']}/` : 'http://localhost:3000/',
    root: path.resolve('./example'),
};

app.get('*', (_, response, next) => {
    response.header('Service-Worker-Allowed', '/');
    next();
});

app.get('/', async (_, response) => {
    const html = fs.readFileSync(`${root}/index.html`, 'utf-8');
    const todos = await render(todoApp({ logo: 'top' }), options);
    response.send(fmt(html, { todos, styles: await preload(todos) }));
});

app.use('/vendor', express.static(vendor));
app.use(express.static(root));

app.listen(3000);
