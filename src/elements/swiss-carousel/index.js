import { create, init, m, t } from '../../index.js';
import {
    importTemplate,
    observeTemplate,
    gatherVariables,
    updatePosition
} from './middleware.js';
import * as u from './utils.js';

const path = init(import.meta.url);

export default create(
    'swiss-carousel',
    m.adapt(),
    m.attrs({ direction: [t.String, 'horizontal'], index: [t.Int, 0] }),
    gatherVariables,
    m.html(({ attrs, props, index = attrs.index, count, width, height, h }) =>
        h('section', { class: attrs.direction }, [
            h('div', { class: 'track' }),
            !u.isTouchable() && controls({ ...props, index, count }),
            h.vars({
                count,
                width,
                height,
                overflow: u.isTouchable() ? 'scroll' : 'hidden',
                left: u.isTouchable() ? 0 : `-${width * index}px`,
                top: u.isTouchable() ? 0 : `-${height * index}px`
            }),
            h.sheet(path('./css/index.css'))
        ])
    ),
    m.once(importTemplate),
    m.once(observeTemplate),
    updatePosition
);

const controls = ({ index, count, render, h }) => {
    const identity = () => {};
    const isStart = index === 0;
    const isEnd = index === count - 1;

    return h(
        'div',
        { class: 'controls' },
        h('a', {
            part: 'previous-link',
            class: `previous ${isStart && 'disabled'}`,
            onclick: isStart ? identity : () => render({ index: index - 1 })
        }),
        h('a', {
            part: 'next-link',
            class: `next ${isEnd && 'disabled'}`,
            onclick: isEnd ? identity : () => render({ index: index + 1 })
        })
    );
};
