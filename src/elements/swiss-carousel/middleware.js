import * as u from './utils.js';

export const importTemplate = ({ node, boundary, props }) => {
    const track = boundary.querySelector('div.track');
    track.innerHTML = '';
    const template = node.querySelector('template');
    const content = document.importNode(template.content, true);
    track.appendChild(content);
    return props;
};

export const observeTemplate = ({ node, render, props }) => {
    const template = node.querySelector('template');
    const config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver(() => {
        importTemplate(props);
        const count = u.getImages(props).length;
        const index = props.latest().index || 0;
        render({ index: index === count ? count - 1 : index });
    });
    observer.observe(template.content, config);
};
