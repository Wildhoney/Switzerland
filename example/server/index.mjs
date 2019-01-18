import path from 'path';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { fetch, cryptr } from './helpers/countries.mjs';

const app = express();
app.use(cors());
app.use(compression());

const example = path.resolve('./example/app');
const vendor = path.resolve(
    process.env.NODE_ENV === 'production' ? './es/production' : './src'
);

app.get('*', (_, response, next) => {
    response.header('Service-Worker-Allowed', '/');
    next();
});

app.use('/vendor', express.static(vendor));
app.use(express.static(example));
app.get('/countries.json', (_, res) => res.send(JSON.stringify(fetch())));
app.get('/images/flags/:hash.svg', (req, res) =>
    res.sendFile(
        path.resolve(
            `./example/app/nodes/flag-app/images/flags/${cryptr.decrypt(
                req.params.hash
            )}`
        )
    )
);
app.listen(process.env.PORT || 3000);
