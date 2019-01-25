import {
    create,
    m
} from 'https://cdn.jsdelivr.net/npm/switzerland@{version}/es/production/index.js';
import { roll } from './middleware/index.js';
import { container } from './partials/index.js';

export default create('{name}', roll, m.html(container));
