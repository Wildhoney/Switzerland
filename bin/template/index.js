import { create } from 'https://cdn.jsdelivr.net/npm/switzerland@{version}/es/production/index.js';
import middleware from './middleware/index.js';

export default create('{name}', ...middleware);
