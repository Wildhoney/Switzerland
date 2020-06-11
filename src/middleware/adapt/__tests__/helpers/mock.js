import { create, m } from '../../../../../src/index.js';

create(
    'x-example',
    m.adapt(),
    m.html(({ adapt = { width: 0, height: 0 }, h }) =>
        h('main', {}, `${Math.round(adapt.width)}×${Math.round(adapt.height)}`)
    )
);
