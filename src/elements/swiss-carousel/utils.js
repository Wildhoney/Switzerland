export const getImages = ({ node }) =>
    Array.from(node.querySelector('template').content.querySelectorAll('img,picture'));

export const isTouchable = () => 'ontouchstart' in window;
