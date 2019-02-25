import * as u from './utils.js';

export const computeVariables = ({ adapt, props }) => {
    const count = u.getImages(props).length;
    const width = Math.ceil(adapt ? adapt.width : 0);
    const height = Math.ceil(adapt ? adapt.height : 0);
    return { ...props, count, width, height };
};

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
        const index = utils.latestProps().attrs.index || 0;
        node.setAttribute('index', index === count ? count - 1 : index);
    });
    observer.observe(template.content, config);
    return props;
};

export const updatePosition = ({ width, height, attrs, boundary, props }) => {
    u.isTouchable() &&
        (attrs.direction === 'horizontal'
            ? boundary.firstChild.scroll(width * attrs.index, 0)
            : boundary.firstChild.scroll(0, height * attrs.index));
    return props;
};

export const dispatchEvent = ({
    attrs,
    signal: { mutations = [] },
    utils,
    props
}) => {
    const isIndex = mutation => mutation.attributeName === 'index';
    const indexModified = mutations.some(isIndex);
    indexModified && utils.dispatch('change', attrs.index);
    return props;
};
