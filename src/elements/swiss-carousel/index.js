import { create, init, m, t } from '../../index.js';
import { importTemplate, observeTemplate } from './middleware.js';
import * as u from './utils.js';

const path = init(import.meta.url);

export default create(
    'swiss-carousel',
    m.adapt(),
    m.attrs({ direction: [t.String, 'horizontal'] }),
    m.html(({ index = 0, adapt, attrs, props, h }) => {
        const count = u.getImages(props).length;
        const width = Math.ceil(adapt ? adapt.width : 0);
        const height = Math.ceil(adapt ? adapt.height : 0);

        return h('section', { class: attrs.direction }, [
            h('div', { class: 'track' }),
            !u.isTouchable() && controls({ ...props, index, count }),
            h.vars({
                count,
                width,
                height,
                overflow: u.isTouchable() ? 'scroll' : 'hidden',
                left: `-${width * index}px`,
                top: `-${height * index}px`
            }),
            h.sheet(path('./css/index.css'))
        ]);
    }),
    m.once(importTemplate),
    m.once(observeTemplate)
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
