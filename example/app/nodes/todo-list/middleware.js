import { m, t } from '/vendor/index.js';
import store from '../../../utils/store.js';

export default (tree) => [
    store,
    m.boundary(),
    m.history({
        filter: [t.Bool, false],
    }),
    m.html(tree),
];
