import parsePath from 'path-parse';

/**
 * @constant path
 * @type {String}
 */
export const path = parsePath(document.currentScript.getAttribute('src')).dir;

/**
 * @method pathFor
 * @param {String} file
 * @return {String}
 */
export const pathFor = file => `${path}/${file}`;
