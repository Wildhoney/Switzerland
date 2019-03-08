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
    prevProps = {},
    h
}) => {
    const isAnimated = prevProps ? Boolean(prevProps.height) : false;

    const vars = {
        count,
        width,
        height,
        overflow: u.isTouchable() ? 'scroll' : 'hidden',
        left: u.isTouchable() ? 0 : `-${width * attrs.index}px`,
        top: u.isTouchable() ? 0 : `-${height * attrs.index}px`,
        animationDuration: 'var(--swiss-carousel-transition-duration)'
    };

    return h.vars(isAnimated ? vars : { ...vars, animationDuration: 0 });
};
