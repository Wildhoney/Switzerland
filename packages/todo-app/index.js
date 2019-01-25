import { create } from 'https://cdn.jsdelivr.net/npm/switzerland@3.7.1/es/production/index.js';
import middleware from './middleware/index.js';

export default create('todo-app', ...middleware);
