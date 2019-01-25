import { m, t } from '/vendor/index.js';
import store from '../../../utils/store.js';
import index from './partials/index.js';

export default [
    store,
    m.history({
        filter: [t.Bool, false]
    }),
    m.html(index)
];
