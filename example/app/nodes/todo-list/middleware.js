import { m, t } from '/vendor/index.js';
import store from '../../../utils/store.js';

export default html => [
    store,
    m.history({
        filter: [t.Bool, false]
    }),
    m.html(html)
];
