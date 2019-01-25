import {
    create,
    m
} from 'https://cdn.jsdelivr.net/npm/switzerland@{version}/es/production/index.js';
import { rollDice } from './middleware/index.js';
import index from './partials/index.js';

export default create('{name}', rollDice, m.vdom(index));
