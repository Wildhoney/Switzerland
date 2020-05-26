import { m } from 'switzerland';
import store from '../../../utils/store.js';

export default (tree) => [store, m.boundary(), m.html(tree)];
