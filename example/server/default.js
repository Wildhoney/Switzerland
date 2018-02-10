import { dirname } from 'path';
import express from 'express';

const app = express();
const rootPath = __dirname + '/../index.html';
app.get('*', (_, response, next) => {
    response.header('Service-Worker-Allowed', '/');
    next();
});

app.use(express.static(dirname(rootPath)));
app.listen(process.env.PORT || 3000);
