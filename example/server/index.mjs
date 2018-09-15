import path from 'path';
import express from 'express';
import compression from 'compression';

const app = express();
app.use(compression());

const example = path.resolve('./example/app');
const vendor = path.resolve('./src');

app.get('*', (_, response, next) => {
    response.header('Service-Worker-Allowed', '/');
    next();
});

app.use('/vendor', express.static(vendor));
app.use(express.static(example));
app.listen(process.env.PORT || 3000);
