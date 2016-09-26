import parsePath from 'path-parse';

/**
 * @constant scriptPath
 * @type {String}
 */
const scriptPath = document.currentScript ? parsePath(document.currentScript.getAttribute('src')).dir : './';

/**
 * @constant path
 * @type {String}
 */
export const path = scriptPath;

/**
 * @method pathFor
 * @param {String} file
 * @return {String}
 */
export const pathFor = file => `${scriptPath}/${file}`;
