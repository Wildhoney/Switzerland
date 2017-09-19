import express from 'express';
import renderToString from '../../src/universal';

const application = express();

application.get('/', async (request, response) => {

    const markup = await renderToString('<welcome-card></welcome-card>');
    response.send(markup);

});

application.use(express.static(__dirname + '/..'));
application.listen(3000);
