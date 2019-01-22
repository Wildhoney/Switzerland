import { create } from '/vendor/index.js';
import middleware from './middleware.js';

export default create('todo-list', ...middleware);
