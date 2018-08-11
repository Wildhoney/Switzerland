import path from 'path';
import express from 'express';
import compression from 'compression';

const app = express();
app.use(compression());

const index = path.resolve('./packages/example/src/index.html');

app.get('*', (_, response, next) => {
    response.header('Service-Worker-Allowed', '/');
    next();
});

app.use(express.static(path.dirname(index)));
app.listen(process.env.PORT || 3000);
