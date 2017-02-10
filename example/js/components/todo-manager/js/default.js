import 'whatwg-fetch';
import 'webcomponents.js';
import './nodes/todo-manager';
import './nodes/todo-add';
import './nodes/todo-list';

// Register the service worker to allow the app to work offline.
import { path } from '../../../../../src/switzerland';
navigator.serviceWorker.register(path('worker.js'), { scope: '/' });
