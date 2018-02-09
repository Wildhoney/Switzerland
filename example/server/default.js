import { dirname } from 'path';
import express from 'express';

const app = express();
const rootPath = __dirname + '/../index.html';
app.use(express.static(dirname(rootPath)));
app.listen(process.env.PORT || 3000);
