import path from 'path';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import fmt from 'string-template';
import { render, preload } from 'switzerland';
import people from '../app/hello-world.js';

const app = express();
app.use(cors());
app.use(compression());

const example = path.resolve('./example/app');
const vendor = path.resolve(process.env.NODE_ENV === 'production' ? './es/production' : './src');

const options = {
    path: 'http://localhost:3000/',
    root: path.resolve('./example/app'),
};

app.get('*', (_, response, next) => {
    response.header('Service-Worker-Allowed', '/');
    next();
});

app.get('/', async (_, response) => {
    const html = fs.readFileSync(`${example}/index.html`, 'utf-8');
    const todos = await render(people, {}, options);

    response.send(fmt(html, { styles: await preload(todos), todos }));
});

app.use('/vendor', express.static(vendor));
app.use(express.static(example));

app.listen(process.env.PORT ?? 3000);
