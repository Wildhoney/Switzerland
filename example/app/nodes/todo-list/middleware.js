import { m, t } from '/vendor/index.js';
import store from '../../../utils/store.js';
import container from './partials/container.js';

export default [
    store,
    m.history({
        filter: [t.Bool, false]
    }),
    m.vdom(container)
];
