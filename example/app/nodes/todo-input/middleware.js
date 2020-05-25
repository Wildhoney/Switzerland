import { m } from '/vendor/index.js';
import store from '../../../utils/store.js';

export default (tree) => [store, m.boundary(), m.html(tree)];
