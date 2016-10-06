import parsePath from 'path-parse';

/**
 * @constant scriptPath
 * @type {String}
 */
const scriptPath = document.currentScript ? parsePath(document.currentScript.getAttribute('src')).dir : './';

/**
 * @method path
 * @param {String} file
 * @return {String}
 */
export const path = file => `${scriptPath}/${file}`;

/**
 * @method toString
 * @return {String}
 */
path.toString = () => scriptPath;
