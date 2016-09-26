import { basename } from 'path';
import { existsSync } from 'fs';
import http from 'http';
import express from 'express';
import { get, create } from 'axios';
import { camelizeKeys } from 'humps';

const app = express();
const server = http.createServer(app);

app.use(express.static(__dirname + '/example'));

app.get('/current', (request, response) => {

    const position = get('http://api.open-notify.org/iss-now.json');
    const astronauts = get('http://api.open-notify.org/astros.json');

    Promise.all([position, astronauts]).then(responses => {

        const [ position, astronauts ] = responses.map(model => camelizeKeys(model.data));
        const people = astronauts.people.map(person => person.name);
        const { latitude, longitude } = position.issPosition;

        const instance = create({
            headers: { 'Accept-Language': 'en-US,en;q=0.8' }
        });

        const url = `http://nominatim.openstreetmap.org/reverse?format=xml&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&format=json&namedetails=0`;

        instance.get(url).then(model => {

            const country = model.data.address.country;
            const flagName = country.replace(/\s+/g, '-').toLowerCase();
            const imagePath = `${__dirname}/example/components/iss-position/images/flags/${flagName}.png`;
            const flag = existsSync(imagePath) ? basename(imagePath) : undefined;

            response.send({ people, country, flag, latitude, longitude });

        }).catch(() => {
            response.send({ people, latitude, longitude });
        });

    });

});

server.listen(process.env.PORT || 5000);
