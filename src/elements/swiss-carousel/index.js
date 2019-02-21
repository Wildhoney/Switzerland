import { create, init, m, t } from '../../index.js';
import {
    importTemplate,
    observeTemplate,
    computeVariables,
    updatePosition,dispatchEvent
} from './middleware.js';
import * as u from './utils.js';
import * as p from './partials.js';

const path = init(import.meta.url);

export default create(
    'swiss-carousel',
    m.adapt(),
    m.attrs({ direction: [t.String, 'horizontal'], index: [t.Int, 0] }),
    computeVariables,
    m.html(({ attrs, props, count, h }) =>
        h('section', { class: attrs.direction }, [
            h('div', { class: 'track' }),
            !u.isTouchable() && p.controls({ ...props, count }),
            p.variables(props),
            h.sheet(path('./css/index.css'))
        ])
    ),
    m.once(importTemplate),
    m.once(observeTemplate),
    updatePosition,
    dispatchEvent
);