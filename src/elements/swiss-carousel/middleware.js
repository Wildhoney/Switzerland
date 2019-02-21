import * as u from './utils.js';

export const importTemplate = ({ node, boundary, props }) => {
    const track = boundary.querySelector('div.track');
    track.innerHTML = '';
    const template = node.querySelector('template');
    const content = document.importNode(template.content, true);
    track.appendChild(content);
    return props;
};

export const observeTemplate = ({ node, utils, props }) => {
    const template = node.querySelector('template');
    const config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver(() => {
        importTemplate(props);
        const count = u.getImages(props).length;
        const index = utils.latest().attrs.index || 0;
        node.setAttribute('index', index === count ? count - 1 : index);
    });
    observer.observe(template.content, config);
};

export const computeVariables = ({
    adapt,
    signal: { mutations = [] },
    props
}) => {
    const count = u.getImages(props).length;
    const width = Math.ceil(adapt ? adapt.width : 0);
    const height = Math.ceil(adapt ? adapt.height : 0);
    const isChangingIndex = mutations.some(
        mutation => mutation.attributeName === 'index'
    );
    return { ...props, count, width, height, isChangingIndex };
};

export const updatePosition = ({
    width,
    height,
    isChangingIndex,
    attrs,
    boundary,
    props
}) => {
    u.isTouchable() &&
        isChangingIndex &&
        (attrs.direction === 'horizontal'
            ? boundary.firstChild.scroll(width * attrs.index, 0)
            : boundary.firstChild.scroll(0, height * attrs.index));
    return props;
};

export const dispatchEvent = ({ attrs, isChangingIndex, utils, props }) => {
    isChangingIndex && utils.dispatch('change', attrs.index);
    return props;
};
