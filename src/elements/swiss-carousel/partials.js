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
            class: `previous ${isStart && 'disabled'}`,
            onclick: isStart
                ? identity
                : () => node.setAttribute('index', attrs.index - 1)
        }),
        h('a', {
            part: 'next-link',
            class: `next ${isEnd && 'disabled'}`,
            onclick: isEnd
                ? identity
                : () => node.setAttribute('index', attrs.index + 1)
        })
    );
};

export const variables = ({ attrs, count, width, height, prevProps, h }) => {
    const isAnimated = prevProps ? prevProps.lifecycle === 'update' : false;
    const variables = {
        count,
        width,
        height,
        overflow: u.isTouchable() ? 'scroll' : 'hidden',
        left: u.isTouchable() ? 0 : `-${width * attrs.index}px`,
        top: u.isTouchable() ? 0 : `-${height * attrs.index}px`,
        animationDuration: 0
    };
    isAnimated && delete variables.animationDuration;
    return h.vars(variables);
};
