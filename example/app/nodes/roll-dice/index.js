import {
    create,
    m
} from 'https://cdn.jsdelivr.net/npm/switzerland@3.8.3/es/production/index.js';
import { roll } from './middleware/index.js';
import { container } from './partials/index.js';

export default create('roll-dice', roll, m.html(container));
