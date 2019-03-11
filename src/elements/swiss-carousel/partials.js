import * as u from './utils.js';

export const controls = ({ attrs, count, node, h }) => {
    const identity = () => {};
    const isStart = attrs.index === 0;
    const isEnd = attrs.index === count - 1;

    return h(
        'div',
        { class: 'controls' },
        h('a', {
            part: 'previous-link',
            class: `previous ${isStart ? 'disabled' : ''}`.trim(),
            onclick: isStart
                ? identity
                : () => node.setAttribute('index', attrs.index - 1)
        }),
        h('a', {
            part: 'next-link',
            class: `next ${isEnd ? 'disabled' : ''}`.trim(),
            onclick: isEnd
                ? identity
                : () => node.setAttribute('index', attrs.index + 1)
        })
    );
};

export const variables = ({
    attrs,
    count,
    width,
    height,
    prevProps = { height: 0 },
    h
}) => {
    const config = {
        count,
        width,
        height,
        overflow: u.isTouchable() ? 'scroll' : 'hidden',
        left: u.isTouchable() ? 0 : `-${width * attrs.index}px`,
        top: u.isTouchable() ? 0 : `-${height * attrs.index}px`,
        animationDuration: 'var(--swiss-carousel-transition-duration)'
    };

    const isAnimated = prevProps.height > 0;
    return h.vars(isAnimated ? config : { ...config, animationDuration: 0 });
};
